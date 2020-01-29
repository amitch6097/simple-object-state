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

function printCount(state: ICounterStoreState) {
  console.log("count:", state.count);
}

// subscribes the printCount function to updates of the store, and since this is the first subscription the store will be created
subscribe(CounterStore, printCount);

// retrive the store and update the state
const store = getStore<CounterStore, ICounterStoreState>(CounterStore);
store.increment();
// count: 1
store.decrement();
// count: 0
store.increment();
// count: 1

// unsubscribing from the store will remove the call to console.log on store updates, but still update the state
unsubscribe(CounterStore, printCount);

// this will stil update the state of the store, so the count will be 2
store.increment();

// unregistering the store will will remove its instance
unregister(CounterStore);
```
