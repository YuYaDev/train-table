import {IColumnType} from "../table/table";
import styles from './table-header.module.css'

interface Props {
    columns: IColumnType[];
    tableType: string;
}

export function TableHeader({ columns }: Props): JSX.Element {
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