# register(Store) => void
adds the store to simple-object-state, which will make it available for use.  Should be done in the Class file, or done before the Store is needed.
### Arguments
1. Store: an extended Store class
### Returns - void
# unregister(Store) => void
remove a store from simple-object-state, is not necessary to use, but can be used if you want a store to be no longer available to anyone.
### Arguments
1. Store: an extended Store class
### Returns - void
# createStore(Store) => void
sets up the Store by calling the constructor of the class, the store will now be able to have state
### Arguments
1. Store: an extended Store class
### Returns - void
# destroyStore(Store) => void
calls the destructor() of the Store class, and removes the instance of the store from simple-object-state.  This remove any state the store has.
### Arguments
1. Store: an extended Store class
### Returns - void
# subscribe(Store, listener: (state: object) => void)  => void
a function that sets up a listener on a Store.  This listener will be called whenever the setState function is called within the Store, with the updated state of the Store.
### Arguments
1. Store: an extended Store class
2. listener: a function that receives a state object
### Returns - void
# unsubscribe(Store, listener: (state: object) => void) => void
a function that removes a listener from Store updates.  This function should be the same one that was used for subscribe().
### Arguments
1. Store: an extended Store class
2. listener: a function that receives a state object
### Returns - void
# getState(Store) => _object_
function which gets the current state of the store
### Arguments 
1. Store: an extended Store class
### Returns - State of the Store (_object_)
# getActions(Store) => _object_
function which gets the actions of the store
### Arguments 
1. Store: an extended Store class
### Returns - Actions of the Store (_object_)

refrence 