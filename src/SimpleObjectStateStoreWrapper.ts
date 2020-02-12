import { Store } from "./Store";

export type ListenerCallback<State> = (state: State) => void;
export type ClassConstructor<Type> = new () => Type;
export class SimpleObjectStateStoreWrapper<
  StoreClass extends Store<State, Actions>,
  State,
  Actions
> {
  Class: ClassConstructor<StoreClass>;
  Listeners: Array<ListenerCallback<State>>;
  Instance: StoreClass | undefined;
  private isCreatedThroughSub: boolean;

  /**
   * Initalize with the Class of the Store, we will setup the
   * store itself later with .Instance and .create()
   */
  constructor(Class: ClassConstructor<StoreClass>) {
    this.Class = Class;
    this.Listeners = [];
    this.isCreatedThroughSub = false;
  }

  /** Just remove the instance, keep the class as we might re-instantiate */
  public destructor() {
    if (this.Instance) {
      this.Instance.destructor();
      this.Instance = undefined;
      this.Listeners = [];
      this.isCreatedThroughSub = false;
    }
  }

  /**
   * Actually setup the store, at this point we would want
   * the stores state to be changing on subscribed to
   */

  public create(): StoreClass {
    if (!this.Instance) {
      this.Instance = new this.Class();
    }
    this.isCreatedThroughSub = false;
    return this.Instance;
  }

  public getInstance(): StoreClass | undefined {
    return this.Instance;
  }

  public callAction(action: string, args: any) {
    if (this.Instance) {
      this.Instance.callAction(action, args);
    }
  }

  public onSetState() {
    if (this.Instance) {
      this.Listeners.forEach(callback => {
        if (callback) {
          callback(this.getState());
        } else {
          // maybe they forgot to unsubscribe
          this.unsubscribe(callback);
        }
      });
    }
  }

  public getActions(): Actions {
    const instance = this.getInstance() as StoreClass;
    if (instance) {
      return instance.getActions();
    } else {
      console.warn("no instance setup yet!");
    }
    return {} as Actions;
  }

  public getState(): State {
    const instance = this.getInstance() as StoreClass;
    if (instance) {
      return instance.getState();
    } else {
      console.warn("no instance setup yet!");
    }
    return {} as State;
  }

  public subscribe(callback: ListenerCallback<State>) {
    this.Listeners.push(callback);
    const hadInstanceBeforeCreate = Boolean(this.Instance);
    this.create();
    if (!hadInstanceBeforeCreate) {
      this.isCreatedThroughSub = true;
    }
  }

  public unsubscribe(callback: ListenerCallback<State>): void {
    if (!this.Instance) {
      return;
    }
    let listeners = [...this.Listeners];
    let nextListeners = [];
    let listener = listeners.pop();
    while (listener && listener !== callback) {
      nextListeners.push(listener);
      listener = listeners.pop();
    }
    nextListeners = [...nextListeners, ...listeners];
    this.Listeners = nextListeners;
    if (this.isCreatedThroughSub && !this.Listeners.length) {
      this.destructor();
    }
  }
}
