# simple-object-state

An experiemental object oriented state mangment lib


### Installation

Make sure you have [Node](https://nodejs.org/)
installed and run:

    npm install simple-object-state
    
## The Gist

The state of your app is stored in multiple singleton store classes, which inherit from the Store class.  A store is setup by registering it with simple-object-state.  From there on, the state of the Store can by changed by calling setState, which is inherited from the Store Class, much like React.Component.  You listen to state changes of a single store, the subscribe() function is used, with arguments of the store and the function to call.  The same is done with unsubscribe(). Function can be set in the store as actions, which will then be avaible for outside store use through callAction. Finally a store is destroyed using unregister, which will remove listeners, if there are any left around, and from then on the store will not be available.  


That's it!

```ts
import {
  subscribe,
  unsubscribe,
  register,
  unregister,
  createStore,
  destroyStore,
  Store,
  callAction,
  getState
} from "simple-object-state";

interface ICounterStoreState {
  count: number;
}

enum CounterStoreAction {
  INCREMENT = "increment",
  DECREMENT = "decrement"
}

interface ICounterStoreActions {
  [CounterStoreAction.INCREMENT]: () => void;
  [CounterStoreAction.DECREMENT]: () => void;
}

class CounterStore extends Store<ICounterStoreState, ICounterStoreActions> {
  static InitialState: ICounterStoreState = {
    count: 0
  };

  constructor() {
    super();
    this.state = CounterStore.InitialState;
    this.actions = {
      increment: this.increment,
      decrement: this.decrement
    };
    console.log("Store has been setup!");
  }

  destructor() {
    console.log("Store has been shut down!");
  }

  increment = () => {
    const { count } = this.state;
    this.setState({
      count: count + 1
    });
  };

  decrement = () => {
    const { count } = this.state;
    this.setState({
      count: count - 1
    });
  };
}

// registers the store with SimpleObject State
register(CounterStore);
console.log(
  "State of the Counter Store will be undefined, beceause it has not been created yet",
  getState(CounterStore)
);

// creates the instance of the store
createStore(CounterStore);

console.log("Store is now ready for updates.", getState(CounterStore));

callAction(CounterStore, CounterStoreAction.INCREMENT);
// count state is now at 1!

console.log("Store is now ready for updates.", getState(CounterStore));

// subscribes the printCount function to updates of the store
function printCount(state: ICounterStoreState) {
  console.log("count:", state.count);
}
subscribe(CounterStore, printCount);

console.log("Prints will not happen on state changes", getState(CounterStore));

// again update the state of store, but this time we subscribed so updates will be printed to the console
callAction(CounterStore, CounterStoreAction.INCREMENT);
// count: 2
callAction(CounterStore, CounterStoreAction.DECREMENT);
// count: 1
callAction(CounterStore, CounterStoreAction.INCREMENT);
// count: 2

// unsubscribing from the store will remove the call to console.log on store updates, but still update the state
unsubscribe(CounterStore, printCount);

// this will stil update the state of the store
callAction(CounterStore, CounterStoreAction.DECREMENT);
console.log("Store can still be updated.", getState(CounterStore)); // state will be 1

// destroying the Store the store will will remove its instance and call destructor() and destory the state of the store
destroyStore(CounterStore);

console.log(
  "State of the Counter Store will be undefined, beceause it was destroyed",
  getState(CounterStore)
);

// unregistering the store will completly remove it from SimpleObjectState
unregister(CounterStore);

```

check it out here [CodeSandbox](https://codesandbox.io/s/simple-object-state-just-js-example-itc61)
