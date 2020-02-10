import { createStore, destroyStore, subscribe, unsubscribe, getState, callAction, unregister} from '../../src/index';
import {SimpleObjectState} from '../../src/SimpleObjectState';

import MockStore from '../../__mock__/MockStore'
import MockDependencyStore from '../../__mock__/MockDependencyStore'


beforeEach(() => {
    destroyStore(MockDependencyStore);
    destroyStore(MockStore);
});

test("dependency store creates and destroys store if it created it", () => {
    expect(SimpleObjectState.getStore(MockStore)).toBe(undefined);
    expect(SimpleObjectState.getStore(MockDependencyStore)).toBe(undefined);
    createStore(MockDependencyStore);
    expect(SimpleObjectState.getStore(MockStore)).toBeDefined();
    expect(SimpleObjectState.getStore(MockDependencyStore)).toBeDefined();
    destroyStore(MockDependencyStore);
    expect(SimpleObjectState.getStore(MockStore)).toBe(undefined);
    expect(SimpleObjectState.getStore(MockDependencyStore)).toBe(undefined);
});


test("mock store remains if another create store was called", () => {
    expect(SimpleObjectState.getStore(MockStore)).toBe(undefined);
    expect(SimpleObjectState.getStore(MockDependencyStore)).toBe(undefined);
    createStore(MockDependencyStore);
    createStore(MockStore);
    expect(SimpleObjectState.getStore(MockStore)).toBeDefined();
    expect(SimpleObjectState.getStore(MockDependencyStore)).toBeDefined();
    destroyStore(MockDependencyStore);
    expect(SimpleObjectState.getStore(MockStore)).toBeDefined();
    expect(SimpleObjectState.getStore(MockDependencyStore)).toBe(undefined);
});


test("mock store can still be destroyed if it is subscribed too and also created", () => {
    expect(SimpleObjectState.getStore(MockStore)).toBe(undefined);
    expect(SimpleObjectState.getStore(MockDependencyStore)).toBe(undefined);
    createStore(MockDependencyStore);
    createStore(MockStore);
    expect(SimpleObjectState.getStore(MockStore)).toBeDefined();
    expect(SimpleObjectState.getStore(MockDependencyStore)).toBeDefined();
    destroyStore(MockDependencyStore);
    destroyStore(MockStore);
    expect(SimpleObjectState.getStore(MockStore)).toBe(undefined);
    expect(SimpleObjectState.getStore(MockDependencyStore)).toBe(undefined);
});


test("mock store update triggers state update", () => {
    const mockFunction = jest.fn();
    subscribe(MockDependencyStore, mockFunction);
    callAction(MockStore, 'increment');
    expect(mockFunction.mock.calls.length).toBe(1)
    expect(mockFunction.mock.calls[0][0]).toEqual({
        countAsString: `This is the count: ${1}`
    });
    unsubscribe(MockDependencyStore, mockFunction);
    expect(SimpleObjectState.getStore(MockStore)).toBe(undefined);
    expect(SimpleObjectState.getStore(MockDependencyStore)).toBe(undefined);
});


