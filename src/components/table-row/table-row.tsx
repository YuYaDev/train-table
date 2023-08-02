import styles from './table-row.module.css'

import { IColumnType } from '../table/table';
import {TableCell} from "../table-cell/table-cell";

interface Props<T> {
    data: T[];
    columns: IColumnType<T>[];
}

export function TableRow<T>({ data, columns }: Props<T>): JSX.Element {

    return (
        <>
            {data.map((item, itemIndex) => (
                <tr key={`table-body-${itemIndex}`} className={styles.tableRowItem }>
                    {columns.map((column, columnIndex) => (
                        <TableCell
                            key={`table-row-cell-${columnIndex}`}
                            item={item}
                            column={column}
                        />
                    ))}
                </tr>
            ))}
        </>
    );
}