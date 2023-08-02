import { combineReducers } from 'redux';
import {IResponseData} from "../../utils/types";
import {GET_TRAIN_DATA, GET_TRAIN_DATA_FAILED, GET_TRAIN_DATA_SUCCESS} from "../actions";


export interface IAction {
    type: string;
    data?: IResponseData[];
}

export interface IStoreState {
    data: IResponseData[];
    dataRequest: boolean,
    dataRequestFailed: boolean,
}
// Исходное состояние
const initialTrainDataState : IStoreState = {
    data: [],
    dataRequest: false,
    dataRequestFailed: false,
};

const trainDataReducer = (state = initialTrainDataState, action: IAction) : IStoreState => {
    switch (action.type) {
        case GET_TRAIN_DATA: {
            return {
                ...state,
                dataRequest: true,
                dataRequestFailed: false,
            };
        }
        case GET_TRAIN_DATA_SUCCESS: {
            return {
                ...state,
                data: action.data,
                dataRequest: false,
            } as IStoreState;
        }
        case GET_TRAIN_DATA_FAILED: {
            return {
                ...state,
                dataRequest: false,
                dataRequestFailed: true,
            };
        }
        default: {
            return state;
        }
    }
};

export const rootReducer = combineReducers({
    trains: trainDataReducer
})

// const appReducer = combineReducers({
//     trainDataReducer
// });
//
// export const rootReducer = (
//     state: IStoreState | undefined,
//     action: any
// ): IStoreState => {
//     return appReducer(state, action);
// };
