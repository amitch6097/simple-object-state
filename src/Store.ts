import { SimpleObjectState } from "./SimpleObjectState";

export class Store<State> {
  protected state: State;

  constructor() {
    this.state = {} as State;
  }

  destructor() {
      return;
  }

  public getState(): State {
    return this.state;
  }

  protected shouldStoreUpdate(nextState: State): boolean {
    const isEqual = shallowEqual(nextState, this.state);
    return !isEqual;
  }

  protected setState(nextState: State) {
    const combinedState = {
        ...this.state,
        ...nextState
    }

    // forgo state update if they are equal
    if (!this.shouldStoreUpdate(combinedState)) {
        return;
    }

    this.state = combinedState;
    SimpleObjectState.onSetState<Store<State>, State>(this);
  }
}


/** Compares the states and returns false if they are not equal, or true if they are */
function shallowEqual(nextState: Record<string, any>, state: Record<string, any>): boolean {
    for (let key in nextState){
        if (nextState[key] !== state[key]) {
            return false;
        }
    }
    return true;
}