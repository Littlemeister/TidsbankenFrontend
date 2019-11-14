import React from 'react';
import MyEmptyComponent from '../../components/common/MyEmptyComponent';

type MyProps = { }

type MyState = { }

const ProfileView: React.FC<{location: any, match: any}> = (props) => (
    <>
        <p>Profile</p>
        <MyEmptyComponent />
    </>
)

export default ProfileView;




