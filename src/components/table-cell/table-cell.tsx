import { IColumnType } from '../table/table';
import { get } from "lodash";
import styles from './table-cell.module.css'

interface Props<T> {
    item: T;
    column: IColumnType<T>;
}

export function TableCell<T>({ item, column }: Props<T>): JSX.Element {
    console.log('Hi');
    console.log(item);
    console.log(column);
    const value = get(item, column.key);
    return (
        <td className={styles.tableCell}>{column.render ? column.render(column, item) : value}</td>
    );
}