import { onSetState } from "./SimpleObjectStore";

export class Store<State> {
  protected state: State;

  constructor() {
    this.state = {} as State;
  }

  public getState(): State {
    return this.state;
  }

  protected setState(state: State) {
    this.state = {
      ...this.state,
      ...state
    };
    onSetState<Store<State>, State>(this);
  }
}
