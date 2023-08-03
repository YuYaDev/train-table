import { IColumnType } from '../table/table';
import { get } from "lodash";
import styles from './table-cell.module.css'
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../index";
import { IIndexedTrainCharacteristics} from "../../utils/types";
import {SET_BUTTON_ACTIVE, SET_BUTTON_INACTIVE, SET_CURRENT_TRAIN_CHARACTERISTIC} from "../../services/actions";
import {setFormValue} from "../../services/actions/input";
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
    const { currentTrainCharacteristics }  = useSelector((store : RootState) => store.trains)
    const [error, setError] = useState(false);
    const [edit, setEdit] = useState(false);

    const dispatch = useAppDispatch();

    const onFormChange = (item : IIndexedTrainCharacteristics, e: React.ChangeEvent<HTMLInputElement>) => {
        let pattern;
        switch (e.target.name) {
            case 'speed':
                pattern = "^[0-9]\\d*$";
                break;
            case 'engineAmperage':
                pattern = "^[1-9]\\d*$";
                break;
            case 'force':
                pattern = "^(?:[1-9]\\d*|0)?(?:\\.\\d+)?$";
                break;
            default:
                pattern = "";
        }

        if(e.target.value.match(pattern) != null){
            setError(false);
            dispatch ({type: SET_BUTTON_ACTIVE});
            setEdit(true);
        }else {
            setError(true);
            dispatch ({type: SET_BUTTON_INACTIVE});
        }
    }

    const onFinishedInput = (item : IIndexedTrainCharacteristics, e: React.ChangeEvent<HTMLInputElement>) => {
        if (!error ){
            (dispatch as ThunkDispatch<IStoreState, unknown, IAction>)(setFormValue(item.global_idx, itemIndex, e.target.name, Number(e.target.value)))
            dispatch ({type: SET_CURRENT_TRAIN_CHARACTERISTIC, item_idx: itemIndex, field: e.target.name, value: Number(e.target.value)})
            setEditable(false);
            setEdit(false);
        }
    }

    const onEndEditField = () => {
        if (error || !edit){
            setEditable(false) ; setError(false); dispatch({type: SET_BUTTON_ACTIVE})
        }
    }

    return (
        <>
            {tableType === "main" &&
                <td className={styles.tableCell}>{get(item, column.key)}</td>}

            {tableType === "details" &&
                <td className={styles.tableCell}
                    onClick={() => setEditable(true)}
                    onMouseLeave={() => onEndEditField()}
                >
                {!isEditable && get(item, column.key)}
                {isEditable &&
                    <input className={error ? styles.inputTextInvalid : styles.inputText}
                           type="text"
                           onBlur={(event) => onFinishedInput(item as IIndexedTrainCharacteristics, event)}
                           onChange ={(event) => onFormChange(item as IIndexedTrainCharacteristics, event)}
                           value={get(currentTrainCharacteristics, column.key)}
                           placeholder={get(item, column.key)} name={column.key}/>
                }
            </td>}
        </>
    );
}