import { SimpleObjectStore } from "./SimpleObjectStore";

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
    SimpleObjectStore.onSetState<Store<State>, State>(this);
  }
}
