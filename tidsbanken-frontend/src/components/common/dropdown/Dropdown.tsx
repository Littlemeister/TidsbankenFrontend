import React, { useEffect, useRef, useState } from 'react';
import styles from '../../../css/Dropdown.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dropdown = (props: any) => {

    const [showDropdown, setShowDropdown] = useState(false);

    const targetRef = useRef(null);

    const handleClick = (event: any) => {
        setShowDropdown(!showDropdown);
    };

    const closeDropDown = (event: any) => {
        if (event.target !== targetRef.current) {
            setShowDropdown(false);
        }
    }

    // Make sure that dropdown is closed when you press outside it..
    useEffect(() => {
        document.addEventListener("mousedown", closeDropDown);
        return () => {
            document.removeEventListener("mousedown", closeDropDown);
        };
    });

    return (
        <div className={styles.module}>
            <span
                className={styles.target + " " + (showDropdown ? styles.active : "")}
                onClick={handleClick}
                ref={targetRef}
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