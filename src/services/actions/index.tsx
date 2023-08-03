import { IResponseData } from "../../utils/types";
import {AnyAction, Dispatch} from 'redux';
import {AppDispatch, useAppDispatch} from "../../index";
import {IAction, IStoreState} from "../reducers";
import {ThunkAction} from "redux-thunk";

export const GET_TRAIN_DATA = 'GET_TRAIN_DATA';
export const GET_TRAIN_DATA_FAILED = "GET_TRAIN_DATA_FAILED";
export const GET_TRAIN_DATA_SUCCESS = "GET_TRAIN_DATA_SUCCESS";
export const SET_CURRENT_TRAIN = 'SET_CURRENT_TRAIN';
export const SET_DETAILS_TABLE_VISIBLE = 'SET_DETAILS_TABLE_VISIBLE';
export const SET_DETAILS_TABLE_INVISIBLE = 'SET_DETAILS_TABLE_INVISIBLE';

const PATH = "https://gist.githubusercontent.com/orlov-oleg-developer/49f08290d1c59a6851e0a0581900e2a7/raw/e5daf87338f3c75165f8edf4c76cc7ec9c2b4aa9/gistfile1.json";

export function requestData(): Promise<IResponseData[]> {
    return fetch(PATH)
        .then(res => res.json())
        .then(res => {
            return res as IResponseData[]
        })
}

export function getData() : ThunkAction<void, IStoreState, unknown, IAction> {
    return function (dispatch)  {
        dispatch({
            type: GET_TRAIN_DATA,
        });
        requestData()
            .then((res) => {
                dispatch({
                    type: GET_TRAIN_DATA_SUCCESS,
                    data: res,
                });
            })
            .catch((err) => {
                dispatch({
                    type: GET_TRAIN_DATA_FAILED,
                });
            });
    };
}

