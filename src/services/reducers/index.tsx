import { combineReducers } from 'redux';
import {IIndexedData, IIndexedTrainCharacteristics, IResponseData, ITrainCharacteristics} from "../../utils/types";
import {
    END_EDIT_FORM_VALUE,
    GET_TRAIN_DATA,
    GET_TRAIN_DATA_FAILED,
    GET_TRAIN_DATA_SUCCESS,
    SET_CURRENT_TRAIN, SET_CURRENT_TRAIN_CHARACTERISTIC, SET_CURRENT_TRAIN_NAME,
    SET_DETAILS_TABLE_VISIBLE, START_EDIT_FORM_VALUE
} from "../actions";
import {FORM_SET_VALUE} from "../actions/input";


export interface IAction {
    type: string;
    data?: IIndexedData[];
    current_train?: IIndexedTrainCharacteristics[];
    global_idx?: number;
    item_idx?: number;
    train_name?: string;
    field?: string;
    value?: number;
}

export interface IStoreState {
    data: IIndexedData[];
    dataRequest: boolean,
    dataRequestFailed: boolean,
    currentTrainCharacteristics:  IIndexedTrainCharacteristics[],
    currentTrainName: string,
    characteristicsVisible: boolean,
    editFrom: boolean,
}

// Исходное состояние
const initialTrainDataState : IStoreState = {
    data: [],
    dataRequest: false,
    dataRequestFailed: false,
    currentTrainCharacteristics: [],
    currentTrainName: 'none',
    characteristicsVisible: false,
    editFrom: false,
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
                currentTrainCharacteristics: action.current_train,
            } as IStoreState;
        }
        case SET_CURRENT_TRAIN_NAME: {
            return {
                ...state,
                currentTrainName: action.train_name,
            } as IStoreState;
        }
        case SET_CURRENT_TRAIN_CHARACTERISTIC: {
            return {
                ...state,
                currentTrainCharacteristics: state.currentTrainCharacteristics.map((item, index) => {
                    if (index !== action.item_idx) {
                        return item
                    }
                    const name = action.field  as keyof ITrainCharacteristics;
                    if (action.value)
                        item[name] = action.value;
                    return item;
                })
            } as IStoreState;
        }
        case SET_DETAILS_TABLE_VISIBLE: {
            return {
                ...state,
                characteristicsVisible: true,
            };
        }
        case START_EDIT_FORM_VALUE: {
            return {
                ...state,
                editFrom: true,
            };
        }
        case END_EDIT_FORM_VALUE: {
            return {
                ...state,
                editFrom: false,
            };
        }
        case FORM_SET_VALUE: {

            // глубокая модификация по индексу основной таблицы
            if (action.item_idx != null && action.global_idx != null && action.field != null) {
                const arr = state.data.map((train, index) => {
                    if (index !== action.global_idx) {
                        return train
                    }

                    train.characteristics.map((item, index) => {
                        if (index !== action.item_idx) {
                            return item
                        }
                        const name = action.field  as keyof ITrainCharacteristics;

                        if (action.value)
                            item[name] = action.value;

                        return item;
                    })
                    return train;
                })
                return {
                    ...state,
                    data: arr,
                 } as IStoreState;
            } else {
                return state;
            }
        }
        default: {
            return state;
        }
    }
};


export const rootReducer = combineReducers({
    trains: trainDataReducer
})
