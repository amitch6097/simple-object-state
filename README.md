# simple-object-state

An experiemental object oriented state mangment lib


### Installation

Make sure you have [Node](https://nodejs.org/)
installed and run:

    npm install simple-object-state
    
## The Gist

The state of your app is stored in multiple singleton store classes, which inherit from the Store class.  A store is setup by registering it with simple-object-state.  From there on, the state of the Store can by changed by calling setState, which is inherited from the Store Class, much like React.Component.  You listen to state changes of a single store, the subscribe() function is used, with arguments of the store and the function to call.  The same is done with unsubscribe().  Finally a store is destroyed using unregister, which will remove a listeners, if there are any left around, and from then on the store will not be available.  


That's it!

```ts
import {
  subscribe,
  register,
  Store,
  getStore,
  unsubscribe,
  unregister
} from "simple-object-state";

interface ICounterStoreState {
  count: number;
}

class CounterStore extends Store<ICounterStoreState> {
  static InitialState: ICounterStoreState = {
    count: 0
  };

  constructor() {
    super();
    this.state = CounterStore.InitialState;
    console.log("Store has been setup!");
  }

  destructor() {
    console.log("Store has been shut down!");
  }

  public increment() {
    const { count } = this.state;
    this.setState({
      count: count + 1
    });
  }

  public decrement() {
    const { count } = this.state;
    this.setState({
      count: count - 1
    });
  }
}

// registers the store with SimpleObject State, this will not create the store yet
register(CounterStore);

const store = getStore<CounterStore, ICounterStoreState>(CounterStore);
console.log("Store is now ready for updates.", store.getState());

store.increment();
// count state is now at 1!

// subscribes the printCount function to updates of the store
function printCount(state: ICounterStoreState) {
  console.log("count:", state.count);
}
subscribe(CounterStore, printCount);

// again update the state of store, but this time we subscribed so updates will be printed to the console
store.increment();
// count: 2
store.decrement();
// count: 1
store.increment();
// count: 2

// unsubscribing from the store will remove the call to console.log on store updates, but still update the state
unsubscribe(CounterStore, printCount);

// this will stil update the state of the store
store.decrement();
console.log("Store can still be updated.", store.getState()); // state will be 1

// unregistering the store will will remove its instance and call destructor()
unregister(CounterStore);
```

check it out here [CodeSandbox](https://codesandbox.io/s/serene-gauss-1cuk6)
