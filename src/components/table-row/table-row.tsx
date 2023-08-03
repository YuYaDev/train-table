import styles from './table-row.module.css'

import { IColumnType } from '../table/table';
import { TableCell} from "../table-cell/table-cell";
import { SET_CURRENT_TRAIN, SET_CURRENT_TRAIN_NAME, SET_DETAILS_TABLE_VISIBLE } from "../../services/actions";
import { useAppDispatch } from "../../index";
import { IIndexedData } from "../../utils/types";


interface Props<T> {
    data: T[] ;
    columns: IColumnType[];
    tableType: string;
}


export function TableRow<T>({ data, columns, tableType }: Props<T>): JSX.Element {

    const dispatch = useAppDispatch();
    function handle(train: IIndexedData) {
        dispatch({
            type: SET_CURRENT_TRAIN_NAME,
            train_name: train.name
        })
        dispatch({type: SET_DETAILS_TABLE_VISIBLE});
        dispatch({
            type: SET_CURRENT_TRAIN,
            current_train: train.characteristics.map((item) => ({
                ...item,
                global_idx: train.global_idx
            }))
        })
    }

    return (
        <>
            {tableType === "main" &&
                data.map((item, itemIndex) => (
                <tr key={`table-body-${itemIndex}`} className={styles.tableRowItem}
                    onClick={() => handle(item as IIndexedData )}>
                    {columns.map((column, columnIndex) => (
                        <TableCell
                            key={`table-row-cell-${columnIndex}`}
                            item={item}
                            column={column}
                            tableType={tableType}
                            itemIndex={itemIndex}
                        />
                    ))}
                </tr>
            ))}

            {tableType === "details" &&
                data.map((item, itemIndex) => (
                    <tr key={`table-body-${itemIndex}`} className={styles.tableRowItem}>
                        {columns.map((column, columnIndex) => (
                            <TableCell
                                key={`table-row-cell-${columnIndex}`}
                                item={item}
                                column={column}
                                tableType={tableType}
                                itemIndex={itemIndex}
                            />
                        ))}
                    </tr>
                ))}
        </>
    );
}