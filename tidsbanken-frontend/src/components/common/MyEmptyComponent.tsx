import React, { useContext, useState } from 'react';
import AuthContext from '../auth/AuthContext';
import Modal from './modal/Modal';

const MyEmptyComponent = (props: any) => {
    const auth = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <p>{auth && auth.user.name}</p>
            {showModal &&
                <Modal display={showModal} setDisplay={setShowModal}>
                    <p>Modal</p>
                </Modal>
            }
        </>
    )
}

export default MyEmptyComponent;