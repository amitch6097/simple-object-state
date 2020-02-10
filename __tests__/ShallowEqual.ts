import {shallowEqual} from '../src/ShallowEqual';


/** Tests for the shallow equal function */

test("shallow equal - simple, test false", () => {
    const state = {
        count: 0,
    }
    const nextState = {
        count: 1
    }
    expect(shallowEqual({state, nextState})).toBe(false)
});

test("shallow equal - simple, test true", () => {
    const state = {
        count: 0
    }
    const nextState = {
        count: 0
    }
    expect(shallowEqual({state, nextState})).toBe(true)
});

test("shallow equal - objects, test true", () => {
    const subState = {str: '1'};
    const state = {
        count: 0,
        subState
    }
    const nextState = {
        count: 0,
        subState
    }
    expect(shallowEqual({state, nextState})).toBe(true)
});

test("shallow equal - objects, test false", () => {
    const subState = {str: '1'};
    const state = {
        count: 0,
        subState
    }
    const nextState = {
        count: 0,
        subState: {...subState}
    }
    expect(shallowEqual({state, nextState})).toBe(false)
});

test("shallow equal - test add new items to state", () => {
    const subState = {str: '1'};
    const state = {
        count: 0,
    }
    const nextState = {
        count: 0,
        subState
    }
    expect(shallowEqual({state, nextState})).toBe(false)
});

test("shallow equal - test partial new state, true", () => {
    const subState = {str: '1'};
    const state = {
        count: 0,
        subState
    }
    const nextState = {
        count: 0,
    }
    expect(shallowEqual({state, nextState})).toBe(true)
});

test("shallow equal - test partial new state, false", () => {
    const subState = {str: '1'};
    const state = {
        count: 0,
        subState
    }
    const nextState = {
        count: 1,
    }
    expect(shallowEqual({state, nextState})).toBe(false)
});