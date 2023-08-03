import { IColumnType } from '../table/table';
import { get } from "lodash";
import styles from './table-cell.module.css'
import {useState} from "react";

interface Props<T> {
    item: T;
    column: IColumnType<T>;
    tableType: string;
    itemIndex?: number;
}

export function TableCell<T>({ item, column, tableType, itemIndex }: Props<T>): JSX.Element {
    const [isEditable, setEditable] = useState(false);
    return (
        <>
            {tableType === "main" && <td className={styles.tableCell}>{get(item, column.key)}</td>}
            {tableType === "details" && <td className={styles.tableCell} onClick={() => setEditable(true)}>
                {!isEditable && get(item, column.key)}
                {isEditable && <input type="text" onChange={() => console.log('change')} value={get(item, column.key)} name="name" id="name" />}
            </td>}
        </>
    );
}