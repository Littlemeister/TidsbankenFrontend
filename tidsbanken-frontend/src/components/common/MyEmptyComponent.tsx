import React from 'react';

type MyProps = {
    location: any;
    match: any;
}

export default class MyEmptyComponent extends React.Component<MyProps, any> {

    render() {
        return (
            <>
                <p>MyEmptyComponent</p>
                <p>My route: {this.props.location.pathname}</p>
                <p>My rendered route: {this.props.match.path}</p>
            </>
        );
    }

}