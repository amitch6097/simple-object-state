import { createStore, destroyStore, subscribe, unsubscribe, getState, callAction} from '../../src/index';
import {SimpleObjectState} from '../../src/SimpleObjectState';
import MockStore from '../../__mock__/MockStore'

beforeEach(() => {
    destroyStore(MockStore);
});

test("store creation lifecycle", () => {
    expect(SimpleObjectState.getStore(MockStore)).toBe(undefined);
    createStore(MockStore);
    expect(SimpleObjectState.getStore(MockStore)).toBeDefined();
    destroyStore(MockStore);
    expect(SimpleObjectState.getStore(MockStore)).toBe(undefined);
});

test("store state updates", () => {
    expect(getState(MockStore)).toEqual(undefined);
    createStore(MockStore);
    expect(getState(MockStore)).toEqual({
        count: 0
    });
    callAction(MockStore, 'increment')
    expect(getState(MockStore)).toEqual({
        count: 1
    });    
    callAction(MockStore, 'decrement')
    expect(getState(MockStore)).toEqual({
        count: 0
    }); 
    callAction(MockStore, 'setCount', 100)
    expect(getState(MockStore)).toEqual({
        count: 100
    });   
    destroyStore(MockStore);
    expect(getState(MockStore)).toEqual(undefined);
});

test("store state subscription", () => {
    expect(getState(MockStore)).toEqual(undefined);
    const mockFunction = jest.fn();
    subscribe(MockStore, mockFunction);
    expect(getState(MockStore)).toEqual({
        count: 0
    });
    callAction(MockStore, 'increment');
    expect(mockFunction.mock.calls.length).toBe(1)
    expect(mockFunction.mock.calls[0][0]).toEqual({
        count: 1
    });    
    callAction(MockStore, 'decrement')
    expect(mockFunction.mock.calls.length).toBe(2)
    expect(mockFunction.mock.calls[1][0]).toEqual({
        count: 0
    });    
    unsubscribe(MockStore, mockFunction);
    callAction(MockStore, 'increment');
    expect(mockFunction.mock.calls.length).toBe(2)
    destroyStore(MockStore);
    expect(getState(MockStore)).toEqual(undefined);
});


