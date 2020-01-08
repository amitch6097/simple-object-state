import { SimpleObjectStateStoreWrapper } from "./SimpleObjectStateStoreWrapper";
import { Store } from "./Store";

declare var window: {
  SimpleObjectState: SimpleObjectState;
};

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

class SimpleObjectState {
  static Instance: SimpleObjectState;
  private Stores: Record<string, SimpleObjectStateStoreWrapper<any, any>> = {};

  constructor() {
    if (window.SimpleObjectState) {
      SimpleObjectState.Instance = window.SimpleObjectState;
      return SimpleObjectState.Instance;
    }
    if (!SimpleObjectState.Instance) {
      SimpleObjectState.Instance = this;
      //@ts-ignore
      window.SimpleObjectState = this;
    }
  }

  public register = <StoreClass extends Store<State>, State>(
    Class: SOSTypes.Class<StoreClass>
  ) => {
    const store = this.addStoreByClass(Class);
    return store;
  };

  public unregister = <StoreClass extends Store<State>, State>(
    Class: SOSTypes.Class<StoreClass>
  ) => {
    if (this.Stores[classStoreName(Class)]) {
      const store = this.Stores[classStoreName(Class)];
      store.destructor();
    }
  };

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
    if (this.Stores[name]) {
      return this.Stores[name].getInstance();
    }
  };

  public getStoreByClass = <StoreClass extends Store<State>, State>(
    Class: SOSTypes.Class<StoreClass>
  ) => {
    if (this.Stores[classStoreName(Class)]) {
      return this.Stores[classStoreName(Class)].getInstance();
    }
  };

  public getStoreByInstance = <StoreClass extends Store<State>, State>(
    This: StoreClass
  ) => {
    if (this.Stores[thisStoreName(This)]) {
      return this.Stores[thisStoreName(This)].getInstance();
    }
  };

  private addStoreByClass<StoreClass extends Store<State>, State>(
    Class: SOSTypes.Class<StoreClass>
  ) {
    if (!this.Stores[classStoreName(Class)]) {
      this.Stores[classStoreName(Class)] = new SimpleObjectStateStoreWrapper<
        State,
        StoreClass
      >(Class);
    }
    return this.Stores[classStoreName(Class)];
  }
}

const simpleObjectState = new SimpleObjectState();
export { simpleObjectState as SimpleObjectState };
