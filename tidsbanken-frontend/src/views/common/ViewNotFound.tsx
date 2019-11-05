import React from 'react';
import Auth from '../../components/auth/Auth';
import MyEmptyComponent from '../../components/common/MyEmptyComponent';

const ViewNotFound: React.FC<{location: any, match: any}> = (props) => (
    <Auth>
        <p>ViewNotFound</p>
        <MyEmptyComponent />
    </Auth>
)

export default ViewNotFound;