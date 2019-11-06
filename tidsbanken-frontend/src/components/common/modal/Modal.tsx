import React from 'react';
import styles from '../../../css/Modal.module.css';

const Modal = (props: any) => {
    if (props.display) {
        return (
            <div className={styles.module} onClick={event => props.setDisplay(false)}>
                <div className={styles.content} onClick={event => event.stopPropagation()}>
                    <span className={styles.closeButton} onClick={event => props.setDisplay(false)}>x</span>
                    { props.children }
                </div>
            </div>
        )
    } else {
        return (<div></div>)
    }
}

export default Modal;