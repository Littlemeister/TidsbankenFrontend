import React, { useState } from 'react';
import styles from '../../../css/Dropdown.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dropdown = (props: any) => {

    const [showDropdown, setShowDropdown] = useState(false);

    const handleClick = (even: any) => {
        setShowDropdown(!showDropdown);
    }

    return (
        <div className={styles.module}>
            <span 
                className={styles.target + " " + (showDropdown ? styles.active : "")} 
                onClick={handleClick}
            >
                {props.title}
                {showDropdown ? <FontAwesomeIcon icon="angle-up" /> : <FontAwesomeIcon icon="angle-down" />}
                
            </span>
            {showDropdown && <div className={styles.items}>
                {props.children}
            </div>}
        </div>
    )
}

export default Dropdown;