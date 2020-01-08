import { Store } from "./Store";

export class SimpleStore<State, StoreClass extends Store<State>> {
  Class: SOSTypes.Class<StoreClass>;
  Listeners: Array<SOSTypes.ListenerCallback<State>>;
  Instance: StoreClass;

  constructor(Class) {
    this.Instance;
    this.Class = Class;
    this.Listeners = [];
  }

  public destructor() {
    this.Class = undefined;
    this.Instance = undefined;
    this.Listeners = [];
  }

  private create() {
    this.Instance = new this.Class();
  }

  private destory() {
    this.Instance = undefined;
  }

  public getInstance(): StoreClass {
    return this.Instance;
  }

  public onSetState() {
    this.Listeners.forEach(callback => callback(this.getState()));
  }

  public getState(): State {
    if (!this.Instance) {
      this.create();
    }
    return this.Instance.getState();
  }

  public subscribe(callback: SOSTypes.ListenerCallback<State>) {
    if (!this.Instance) {
      this.create();
    }
    this.Listeners.push(callback);
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
