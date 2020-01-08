import Store from "../Store";
import SimpleStore from "../SimpleStore";

export = SOSTypes;
export as namespace SOSTypes;

declare namespace SOSTypes {
  type ListenerCallback<State> = (state: State) => void;
  type Class<Type> = new () => Type;
}
