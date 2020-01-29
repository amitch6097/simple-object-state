import { Store } from "./Store";

export type ListenerCallback<State> = (state: State) => void;
export type ClassConstructor<Type> = new () => Type;
export class SimpleObjectStateStoreWrapper<
  State,
  StoreClass extends Store<State>
> {
  Class: ClassConstructor<StoreClass>;
  Listeners: Array<ListenerCallback<State>>;
  Instance: StoreClass | undefined;


  /**
   * Initalize with the Class of the Store, we will setup the
   * store itself later with .Instance and .create()
   */
  constructor(Class: ClassConstructor<StoreClass>) {
    this.Class = Class;
    this.Listeners = [];
  }


  /** Just remove the instance, keep the class as we might re-instantiate */
  public destructor() {
    if (this.Instance) {
      this.Instance.destructor();
      this.Instance = undefined;
      this.Listeners = [];
    }
  }

  /**
   * Actually setup the store, at this point we would want
   * the stores state to be changing on subscribed to
   */

  private create(): StoreClass {
    if (!this.Instance) {
      this.Instance = new this.Class();
    }
    return this.Instance;
  }

  public getInstance(): StoreClass | undefined {
    return this.create();
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

  public getState(): State {
    const instance = this.create();
    return instance.getState();
  }

  public subscribe(callback: ListenerCallback<State>) {
    this.Listeners.push(callback);
    this.create();
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
  }
}
