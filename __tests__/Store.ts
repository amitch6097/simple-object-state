import {Store} from '../src/Store';


interface IJestMockStoreState {
    obj : {
        count: number
    },
    str: string
}

interface IJestMockStoreActions {
    updateCount: (count: number) => void;
    updateStr: (str: string) => void;
}

const constructor = jest.fn();
const destructor = jest.fn();
const shouldStoreUpdate = jest.fn();

class JestMockStore extends Store<IJestMockStoreState, IJestMockStoreActions> {

    static InitialState = {
        obj: {
            count: 1
        },
        str: '1'
    }

    constructor() {
        super();
        this.state = JestMockStore.InitialState;
        this.actions = {
            updateCount: this.updateCount,
            updateStr: this.updateStr
        }
        constructor();
    }

    updateCount = (count: number) => {
        this.setState({
            obj: {
                ...this.state.obj,
                count
            }
        });
    }

    updateStr = (str: string) => {
        this.setState({
            str
        })
    }
}