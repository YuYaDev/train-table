import { combineReducers } from 'redux';
import {IResponseData, ITrainCharacteristics} from "../../utils/types";
import {
    GET_TRAIN_DATA,
    GET_TRAIN_DATA_FAILED,
    GET_TRAIN_DATA_SUCCESS,
    SET_CURRENT_TRAIN, SET_DETAILS_TABLE_INVISIBLE,
    SET_DETAILS_TABLE_VISIBLE
} from "../actions";


export interface IAction {
    type: string;
    data?: IResponseData[];
    train?: ITrainCharacteristics[];
}

export interface IStoreState {
    data: IResponseData[];
    dataRequest: boolean,
    dataRequestFailed: boolean,
    currentTrainCharacteristics: ITrainCharacteristics[],
    characteristicsVisible: boolean
}

// Исходное состояние
const initialTrainDataState : IStoreState = {
    data: [],
    dataRequest: false,
    dataRequestFailed: false,
    currentTrainCharacteristics: [],
    characteristicsVisible: false
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
        case SET_CURRENT_TRAIN: {
            return {
                ...state,
                currentTrainCharacteristics: action.train,
            } as IStoreState;
        }
        case SET_DETAILS_TABLE_VISIBLE: {
            return {
                ...state,
                characteristicsVisible: true,
            };
        }
        case SET_DETAILS_TABLE_INVISIBLE: {
            return {
                ...state,
                characteristicsVisible: false,
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
