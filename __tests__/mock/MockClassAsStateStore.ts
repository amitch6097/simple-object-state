import {Store, register} from '../../src/index';

class Counter {
    count: number = 0;
    
    increment = () => {
        this.count += 1;
    }

    decrement = () => {
        this.count -= 1;
    }

    setCount = (count: number) => {
        this.count = count;
    }
}


export interface IMockClassAsStateStoreState {
    count: number;
}

export interface IMockClassAsStateStoreActions {
    increment: () => void;
    decrement: () => void;
    setCount: (count: number) => void;
}

export default class MockClassAsStateStore extends Store<IMockClassAsStateStoreState, IMockClassAsStateStoreActions> {
    state: IMockClassAsStateStoreState;
    actions: IMockClassAsStateStoreActions;
    counter: Counter;

    constructor() {
        super();
        this.counter = new Counter();
        this.state = {
            count: this.counter.count
        }
        this.actions = {
            increment: this.counter.increment,
            decrement: this.counter.decrement,
            setCount: this.counter.setCount

        }
    }

    storeDidCallAction = (action: string) => {
        this.setState({
            count: this.counter.count
        })
    }
}

register(MockClassAsStateStore);