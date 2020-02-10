/** 
 * Shallow Equal function should talk two states and compare if they are
 * the same.  The same being the a shallow comparison on sub-objects
 * within the state and also accepting a partial of the current state,
 * as the next state parameter.  Meaning that only the keys of the nextState
 * parameter will be checked
 */
export function shallowEqual({
  nextState,
  state
}: {
  nextState: Record<string, any>;
  state: Record<string, any>;
}): boolean {
  for (let key in nextState) {
    if (nextState[key] !== state[key]) {
      return false;
    }
  }
  return true;
}
