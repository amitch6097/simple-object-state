import {
  SimpleObjectStateStoreWrapper,
  ClassConstructor,
  ListenerCallback
} from "./SimpleObjectStateStoreWrapper";
import { Store } from "./Store";

declare var window: {
  SimpleObjectState: SimpleObjectState;
};

/** Helpers */

function isClass(ref: any): boolean {
  return typeof ref === "function";
}

function isInstance(ref: any): boolean {
  return typeof ref === "object" && ref.constructor;
}

function isString(ref: any): boolean {
  return typeof ref === "string";
}

function classStoreName<StoreClass extends Store<State>, State>(
  Class: ClassConstructor<StoreClass>
): string {
  return Class.name;
}
function instanceStoreName<StoreClass extends Store<State>, State>(
  This: StoreClass
): string {
  return This.constructor.name;
}

/** Simple Object State Singleton */

class SimpleObjectState {
  static Instance: SimpleObjectState;
  private Stores: Record<string, SimpleObjectStateStoreWrapper<any, any>> = {};
  private debug: boolean;

  constructor() {
    this.debug = false;

    if (window.SimpleObjectState) {
      SimpleObjectState.Instance = window.SimpleObjectState;
      return SimpleObjectState.Instance;
    }
    if (!SimpleObjectState.Instance) {
      SimpleObjectState.Instance = this;
      window.SimpleObjectState = this;
    }
  }

  /** Sets debug mode where a stack will be built of state updates */
  public setDebug(value: boolean) {
    this.debug = value;
  }

  /** Returns the Store Instance if one */
  public getStore = <StoreClass extends Store<State>, State>(
    ref: string | StoreClass | ClassConstructor<StoreClass>
  ): StoreClass | undefined => {
    const wrapper = this.getWrapper(ref);
    if (wrapper) {
      return wrapper.getInstance();
    }
  };

  /** Returns the Store Class if one */
  public getClass = <StoreClass extends Store<State>, State>(
    ref: string | StoreClass | ClassConstructor<StoreClass>
  ): ClassConstructor<StoreClass> | undefined => {
    const wrapper = this.getWrapper(ref);
    if (wrapper) {
      return wrapper.Class;
    }
  };

  /** Returns the Store Static Initial State if one */
  public getInitialState = <
    StoreClass extends Store<State> & { InitialState: State },
    State
  >(
    ref: string | StoreClass | ClassConstructor<StoreClass>
  ): State | undefined => {
    const store = this.getStore(ref);
    if (store) {
      return store.InitialState;
    }
  };

  /** Registers the Store, this will not actually instantiate the Store */
  public register = <StoreClass extends Store<State>, State>(
    Class: ClassConstructor<StoreClass>
  ) => {
    const store = this.addStoreByClass(Class);
    return store;
  };

  public unregister = <StoreClass extends Store<State>, State>(
    Class: ClassConstructor<StoreClass>
  ) => {
    if (this.Stores[classStoreName(Class)]) {
      const store = this.Stores[classStoreName(Class)];
      store.destructor();
    }
  };

  /** Subscribes a callback to a stores setState function */
  public subscribe = <StoreClass extends Store<State>, State>(
    ref: string | StoreClass | ClassConstructor<StoreClass>,
    callback: ListenerCallback<State>
  ) => {
    const store = this.getWrapper<StoreClass, State>(ref);
    if (store) {
      store.subscribe(callback);
    } else {
      console.warn("Store ", ref, " was not available for subscribe!");
    }
  };

  public unsubscribe = <StoreClass extends Store<State>, State>(
    ref: string | StoreClass | ClassConstructor<StoreClass>,
    callback: ListenerCallback<State>
  ) => {
    const store = this.getWrapper<StoreClass, State>(ref);
    if (store) {
      store.unsubscribe(callback);
    } else {
      console.warn("Store ", ref, " was not available for unsubscribe!");
    }
  };

  /** Called by the Store when it sets its own state to call all subscribers */
  public onSetState = <StoreClass extends Store<State>, State>(
    This: StoreClass
  ) => {
    if (this.debug) {
      console.groupCollapsed(
        `SimpleObjectState State Update - ${This.constructor.name}`
      );
      console.log("Store -", This);
      console.log("New State -", This.getState());
      console.groupCollapsed('Stack Trace');
      console.trace(); // hidden in collapsed group
      console.groupEnd();
      console.groupEnd();
    }
    const wrapper = this.Stores[instanceStoreName(This)];
    wrapper.onSetState();
  };

  /** Private  */

  /** Returns the Store Class if one */
  private getString = <StoreClass extends Store<State>, State>(
    ref: string | StoreClass | ClassConstructor<StoreClass>
  ): string | undefined => {
    if (isString(ref)) {
      return ref as string;
    } else if (isClass(ref)) {
      return classStoreName(ref as ClassConstructor<StoreClass>);
    } else if (isInstance(ref)) {
      return instanceStoreName(ref as StoreClass);
    }
  };

  /** Returns the Store Wrapper if on or creates if ref is a Class */
  private getWrapper = <StoreClass extends Store<State>, State>(
    ref: string | StoreClass | ClassConstructor<StoreClass>
  ): SimpleObjectStateStoreWrapper<State, StoreClass> | undefined => {
    const storeString = this.getString(ref);
    if (storeString) {
      return this.Stores[storeString];
    } else if (isClass(ref)) {
      /** If it is a class we can actually register it */
      return this.register(ref as ClassConstructor<StoreClass>);
    }
  };

  private addStoreByClass<StoreClass extends Store<State>, State>(
    Class: ClassConstructor<StoreClass>
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
