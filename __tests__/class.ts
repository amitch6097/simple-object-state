import { createStore, destroyStore, subscribe, unsubscribe, getState, callAction} from '../src/index';
import {SimpleObjectState} from '../src/SimpleObjectState';

import MockClassAsStateStore from './mock/MockClassAsStateStore'

beforeEach(() => {
    destroyStore(MockClassAsStateStore);
});

test("store state updates", () => {
    expect(getState(MockClassAsStateStore)).toEqual(undefined);
    createStore(MockClassAsStateStore);
    expect(getState(MockClassAsStateStore)).toEqual({
        count: 0
    });
    callAction(MockClassAsStateStore, 'increment')
    expect(getState(MockClassAsStateStore)).toEqual({
        count: 1
    });    
    callAction(MockClassAsStateStore, 'decrement')
    expect(getState(MockClassAsStateStore)).toEqual({
        count: 0
    }); 
    callAction(MockClassAsStateStore, 'setCount', 100)
    expect(getState(MockClassAsStateStore)).toEqual({
        count: 100
    });   
    destroyStore(MockClassAsStateStore);
    expect(getState(MockClassAsStateStore)).toEqual(undefined);
});


