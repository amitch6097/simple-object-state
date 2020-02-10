import {Store, register} from '../src/index';

export interface IMockStoreState {
    count: number;
}

export interface IMockStoreActions {
    increment: () => void;
    decrement: () => void
    setCount: (count: number) => void;
}

export default class MockStore extends Store<IMockStoreState, IMockStoreActions> {
    static InitialState: IMockStoreState = {
        count: 0
    }

    state: IMockStoreState;
    actions: IMockStoreActions;

    constructor() {
        super();
        this.state = MockStore.InitialState;
        this.actions = {
            increment: this.increment,
            decrement: this.decrement,
            setCount: this.setCount
        }
    }

    public increment = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    public decrement = () => {
        this.setState({
            count: this.state.count - 1
        })
    }

    public setCount = (count: number) => {
        this.setState({
            count
        });
    }
}

register(MockStore);