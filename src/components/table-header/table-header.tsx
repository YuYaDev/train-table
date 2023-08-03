import {IColumnType} from "../table/table";
import styles from './table-header.module.css'

interface Props<T> {
    columns: IColumnType<T>[];
    tableType: string;
}

export function TableHeader<T>({ columns, tableType }: Props<T>): JSX.Element {
    return (
        <tr>
            {columns.map((column, columnIndex) => (
                <th
                    className={styles.tableHeader}
                    key={`table-head-cell-${columnIndex}`}
                    style={{ width: column.width }}
                >
                    {column.title}
                </th>
            ))}
        </tr>
    );
}