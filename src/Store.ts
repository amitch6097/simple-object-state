import { SimpleObjectState } from "./SimpleObjectState";
import { shallowEqual } from "./ShallowEqual";

export class Store<State, Actions> {
  protected state: State;
  protected actions: Actions;

  constructor() {
    this.state = {} as State;
    this.actions = {} as Actions;
  }

  destructor() {
    return;
  }

  public getActions(): Actions {
    return this.actions;
  }

  public getState(): State {
    return this.state;
  }

  public callAction(action: string, args: any) {
    const actions: any = this.actions;
    if (this.actions && action && actions[action]) {
      const func = actions[action];
      func(...args);
      this.storeDidCallAction(action);
    }
  }

  protected storeDidCallAction(action: string) {
    return;
  }

  protected storeDidUpdate(prevState: State) {
    return;
  }

  protected shouldStoreUpdate(nextState?: State): boolean {
    if (nextState) {
        const state = this.state;
        const isEqual = shallowEqual({nextState, state});
        return !isEqual;
    }
    return false;
  }

  protected setState(nextState: Partial<State>) {
    const prevState = this.state;
    const combinedState = {
      ...this.state,
      ...nextState
    } as State;

    // forgo state update if they are equal
    if (!this.shouldStoreUpdate(combinedState)) {
      return;
    }

    this.state = combinedState;
    SimpleObjectState.onSetState(this);
    this.storeDidUpdate(prevState);
  }
}
