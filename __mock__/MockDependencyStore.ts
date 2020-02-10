import {Store, register, subscribe, callAction, unsubscribe} from '../src/index';
import MockStore, {IMockStoreState} from './MockStore';

export interface IMockDependencyStoreState {
    countAsString: string;
}

function convertMockStoreState(state: IMockStoreState): IMockDependencyStoreState {
    return {
        countAsString: `This is the count: ${state.count}`
    }
}

export default class MockDependencyStore extends Store<IMockDependencyStoreState, any> {
    static InitialState: IMockDependencyStoreState = {
        countAsString: '0'
    }

    state: IMockDependencyStoreState;

    constructor() {
        super();
        this.state = MockDependencyStore.InitialState;
        subscribe(MockStore, this.onMockStoreUpdate);
    }

    destructor() {
        unsubscribe(MockStore, this.onMockStoreUpdate);
    }

    private onMockStoreUpdate = (state: IMockStoreState) => {
        this.setState(convertMockStoreState(state))
    }

}

register(MockDependencyStore);