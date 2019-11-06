import React from 'react';
import styles from '../../../css/Popover.module.css';

const Popover = (props: any) => {
    if(props.popoverDislay){
        return (
            <div className={styles.wrapper} id={props.id}>
                {props.children}
            </div>
        )   
    } else {
        return (<div></div>)
    }
      
}

export default Popover;