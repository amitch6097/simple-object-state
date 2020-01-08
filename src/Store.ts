import { SimpleObjectState } from "./SimpleObjectState";

export class Store<State> {
  protected state: State;

  constructor() {
    this.state = {} as State;
  }

  destructor() {}

  public getState(): State {
    return this.state;
  }

  protected setState(state: State) {
    this.state = {
      ...this.state,
      ...state
    };
    SimpleObjectState.onSetState<Store<State>, State>(this);
  }
}
