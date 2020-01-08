import { SimpleStore } from "./SimpleStore";
import { Store } from "./Store";

function classStoreName<StoreClass extends Store<State>, State>(
  Class: SOSTypes.Class<StoreClass>
) {
  return Class.name;
}
function thisStoreName<StoreClass extends Store<State>, State>(
  This: StoreClass
) {
  return This.constructor.name;
}

class SimpleObjectStore {
  static Instance;
  private Stores: Record<string, SimpleStore<any, any>> = {};

  constructor() {
    if (!SimpleObjectStore.Instance) {
      SimpleObjectStore.Instance = this;
      //@ts-ignore
      window.SimpleObjectStore = this;
    }
  }

  destructor() {
    const keys = Object.keys(this.Stores);
    if (keys && keys.length) {
      keys.forEach(key => {
        this.Stores[key].destructor();
      });
    }
  }

  public onSetState = <StoreClass extends Store<State>, State>(
    This: StoreClass
  ) => {
    const store = this.getStoreByInstance<StoreClass, State>(This);
    store.onSetState();
  };

  public subscribe = <StoreClass extends Store<State>, State>(
    Class: SOSTypes.Class<StoreClass>,
    callback: SOSTypes.ListenerCallback<State>
  ) => {
    const store = this.addStoreByClass(Class);
    store.subscribe(callback);
  };

  public unsubscribe = <StoreClass extends Store<State>, State>(
    Class: SOSTypes.Class<StoreClass>,
    callback: SOSTypes.ListenerCallback<State>
  ) => {
    const store = this.addStoreByClass(Class);
    store.unsubscribe(callback);
  };

  public getStoreByString = (name: string) => {
    return this.Stores[name];
  };

  public getStoreByClass = <StoreClass extends Store<State>, State>(
    Class: SOSTypes.Class<StoreClass>
  ) => {
    return this.Stores[classStoreName(Class)];
  };

  public getStoreByInstance = <StoreClass extends Store<State>, State>(
    This: StoreClass
  ) => {
    return this.Stores[thisStoreName(This)];
  };

  private addStoreByClass<StoreClass extends Store<State>, State>(
    Class: SOSTypes.Class<StoreClass>
  ) {
    if (!this.Stores[classStoreName(Class)]) {
      this.Stores[classStoreName(Class)] = new SimpleStore<State, StoreClass>(
        Class
      );
    }
    return this.Stores[classStoreName(Class)];
  }
}

const simpleObjectStore = new SimpleObjectStore();
export const subscribe = simpleObjectStore.subscribe;
export const onSetState = simpleObjectStore.onSetState;
export { simpleObjectStore as SimpleObjectStore };
