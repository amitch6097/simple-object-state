import { SimpleObjectState } from "./src/SimpleObjectState";
export { Store } from "./src/Store";
export const subscribe = SimpleObjectState.subscribe;
export const unsubscribe = SimpleObjectState.unsubscribe;
export const register = SimpleObjectState.register;
export const unregister = SimpleObjectState.unregister;
export const getStore = SimpleObjectState.getStore;
export const getClass = SimpleObjectState.getClass;
export const getInitialState = SimpleObjectState.getInitialState;

