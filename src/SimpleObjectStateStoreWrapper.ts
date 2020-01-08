import { Store } from "./Store";

export class SimpleObjectStateStoreWrapper<
  State,
  StoreClass extends Store<State>
> {
  Class: SOSTypes.Class<StoreClass>;
  Listeners: Array<SOSTypes.ListenerCallback<State>>;
  Instance: StoreClass | undefined;

  constructor(Class: SOSTypes.Class<StoreClass>) {
    this.Instance;
    this.Class = Class;
    this.Listeners = [];
  }

  public destructor() {
    if (this.Instance) {
      this.Instance.destructor();
      this.Instance = undefined;
      this.Listeners = [];
    }
  }

  private create(): StoreClass {
    if (!this.Instance) {
      this.Instance = new this.Class();
    }
    return this.Instance;
  }

  public getInstance(): StoreClass {
    return this.create();
  }

  public onSetState() {
    this.Listeners.forEach(callback => {
      if (callback) {
        callback(this.getState());
      } else {
        // maybe they forgot to unsubscribe
        this.unsubscribe(callback);
      }
    });
  }

  public getState(): State {
    const instance = this.create();
    return instance.getState();
  }

  public subscribe(callback: SOSTypes.ListenerCallback<State>) {
    this.Listeners.push(callback);
    this.create();
    callback(this.getState());
  }

  public unsubscribe(callback: SOSTypes.ListenerCallback<State>): void {
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
