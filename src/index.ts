import { SimpleObjectState } from "./SimpleObjectState";
export { Store } from "./Store";
export const subscribe = SimpleObjectState.subscribe;
export const unsubscribe = SimpleObjectState.unsubscribe;
export const register = SimpleObjectState.register;
export const unregister = SimpleObjectState.unregister;
export const getInitialState = SimpleObjectState.getInitialState;
export const callAction = SimpleObjectState.callAction;
export const createStore = SimpleObjectState.createStore;
export const destroyStore = SimpleObjectState.destroyStore;
export const getState = SimpleObjectState.getState;
export const getActions = SimpleObjectState.getActions;



