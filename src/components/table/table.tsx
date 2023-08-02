import styles from './table.module.css';
import { TableHeader } from '../table-header/table-header';
import { TableRow } from '../table-row/table-row';

// Шаблонный тип столбца таблицы
export interface IColumnType<T> {
    key: string;
    title: string;
    width?: number;
    render?: (column: IColumnType<T>, item: T) => void;
}

interface Props<T> {
    data: T[];
    columns: IColumnType<T>[];
}

export function Table<T>({ data, columns }: Props<T>): JSX.Element {
    return (
        <table className={styles.tableContainer}>
            <thead>
            <TableHeader columns={columns} />
            </thead>
            <tbody>
            <TableRow data={data} columns={columns} />
            </tbody>
        </table>
    );
}