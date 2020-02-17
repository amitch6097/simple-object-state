# Store
A Singleton class that holds state and actions.  This class should be extended to create your own Store.  Multiple Stores will probably be created for your application.  Each Store should have a single concern.

## Protected Variables

### state: (_object_)
object which represents the state of the Store, and should not be directly update, but only setup in the constructor and updated through setState.

### actions: (_object_)
object which contains functions which can be called outside of the Store to update the state of the Store.
## Protected Methods 
### destructor() => void
function that is called on destroyStore, which should handle anything the Store needs to be removed.
### setState(state) => void
function which updates the protected state object

### storeDidCallAction(action: string) => void 
function called after an action is called, with the string of the function name.  Can be used to trigger a side effect after an action is called.

### storeDidUpdate(previousState: object) => void 
function called after the store has update its state.

### shouldStoreUpdate(nextState: object) => boolean 
function that is called within setState, that decides if the Store actually needs to updates it state.  A return value of false, will not update the protect state member and not call any of the listeners of the Store. A return value of true, will update the protected state member and call the listener functions of the Store.
