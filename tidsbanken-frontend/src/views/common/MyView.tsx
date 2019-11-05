import React from 'react';
import Auth from '../../components/auth/Auth';
import MyEmptyComponent from '../../components/common/MyEmptyComponent';

const MyView: React.FC<{location: any, match: any}> = (props) => (
    <Auth>
        <p>MyView</p>
        <MyEmptyComponent />
    </Auth>
)

export default MyView;