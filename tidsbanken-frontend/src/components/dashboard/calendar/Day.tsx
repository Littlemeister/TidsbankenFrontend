import React from 'react';
import styles from '../../../css/Calendar.module.css';
import { format } from 'date-fns';

const Day = (props: any) => {
    let classNames = [styles.day, props.className, (props.empty ? styles.empty : "")].join(" ");
    return <div className={classNames} title={props.date ? format(props.date, 'yyyy-MM-dd'): ''}>
        <span>{props.date ? format(props.date, 'ccc do MMM') : ''}</span>
    </div>
}

export default Day;