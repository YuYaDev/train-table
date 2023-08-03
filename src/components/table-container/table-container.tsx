import styles from "../table-container/table-container.module.css";

type Props = {
    children: string | JSX.Element | JSX.Element[];
    title: string;
    subtitle?: string;
}

export function TableContainer({title, subtitle, children} : Props): JSX.Element {
    return (
        <div className={styles.container} >
            <p className={styles.title}>{title}</p>
            <p className={styles.subtitle}>{subtitle}</p>
            {children}
        </div>
    );
}