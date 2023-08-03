import { IResponseData } from "../../utils/types";
import {AnyAction, Dispatch} from 'redux';
import {AppDispatch, useAppDispatch} from "../../index";
import {IAction, IStoreState} from "../reducers";
import {ThunkAction} from "redux-thunk";

export const GET_TRAIN_DATA = 'GET_TRAIN_DATA';
export const GET_TRAIN_DATA_FAILED = "GET_TRAIN_DATA_FAILED";
export const GET_TRAIN_DATA_SUCCESS = "GET_TRAIN_DATA_SUCCESS";
export const SET_CURRENT_TRAIN = 'SET_CURRENT_TRAIN';
export const SET_CURRENT_TRAIN_NAME = 'SET_CURRENT_TRAIN_NAME';
export const SET_CURRENT_TRAIN_CHARACTERISTIC = 'SET_CURRENT_TRAIN_CHARACTERISTIC';
export const SET_DETAILS_TABLE_VISIBLE = 'SET_DETAILS_TABLE_VISIBLE';
export const START_EDIT_FORM_VALUE = 'START_EDIT_FORM_VALUE';
export const END_EDIT_FORM_VALUE = 'END_EDIT_FORM_VALUE';

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
                const indexedData =  res.map((train, train_idx) => ({
                    ...train,
                    global_idx: train_idx
                }))

                dispatch({
                    type: GET_TRAIN_DATA_SUCCESS,
                    data: indexedData,
                });
            })
            .catch((err) => {
                dispatch({
                    type: GET_TRAIN_DATA_FAILED,
                });
            });
    };
}

