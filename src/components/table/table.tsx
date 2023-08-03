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
    tableType: string;
}

export function Table<T>({ data, columns, tableType }: Props<T>): JSX.Element {

    return (
        <table className={styles.tableContainer} >
            <thead>
            <TableHeader columns={columns} tableType={tableType} />
            </thead>
            <tbody>
            <TableRow data={data} columns={columns} tableType={tableType}/>
            </tbody>
        </table>
    );
}