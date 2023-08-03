import { IColumnType } from '../table/table';
import { get } from "lodash";
import styles from './table-cell.module.css'
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../index";
import {IIndexedData, IIndexedTrainCharacteristics, IResponseData} from "../../utils/types";
import {
    END_EDIT_FORM_VALUE,
    SET_CURRENT_TRAIN,
    SET_CURRENT_TRAIN_CHARACTERISTIC,
    SET_DETAILS_TABLE_VISIBLE,
    START_EDIT_FORM_VALUE
} from "../../services/actions";
import {FORM_SET_VALUE, setFormValue} from "../../services/actions/input";
import {ThunkDispatch} from "redux-thunk";
import {IAction, IStoreState} from "../../services/reducers";

interface Props<T> {
    item: T;
    column: IColumnType<T>;
    tableType: string;
    itemIndex: number;
}

export function TableCell<T>({ item, column, tableType, itemIndex }: Props<T>): JSX.Element {

    const [isEditable, setEditable] = useState(false);
    const { currentTrainCharacteristics, editFrom }  = useSelector((store : RootState) => store.trains)

    const dispatch = useAppDispatch();
    const onFormChange = (item : IIndexedTrainCharacteristics, e: React.ChangeEvent<HTMLInputElement>) => {
        (dispatch as ThunkDispatch<IStoreState, unknown, IAction>)(setFormValue(item.global_idx, itemIndex, e.target.name, Number(e.target.value)))
        dispatch ({type: SET_CURRENT_TRAIN_CHARACTERISTIC, item_idx: itemIndex, field: e.target.name, value: Number(e.target.value)})
    }

    return (
        <>
            {tableType === "main" && <td className={styles.tableCell}>{get(item, column.key)}</td>}
            {tableType === "details" && <td className={styles.tableCell} onClick={() => setEditable(true)} >
                {!isEditable && get(item, column.key)}
                {isEditable && <input type="number" onBlur={() => setEditable(false)} onChange={(event) => onFormChange(item as IIndexedTrainCharacteristics, event)} value={get(currentTrainCharacteristics, column.key)} placeholder={get(item, column.key)} name={column.key}  />}
            </td>}
        </>
    );
}