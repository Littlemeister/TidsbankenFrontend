import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthRoute from './components/auth/AuthRoute';
import Auth from './components/auth/Auth';
import { library } from '@fortawesome/fontawesome-svg-core';
import './App.css';
import {
    faAngleDown,
    faAngleUp,
    faCaretLeft,
    faCaretRight,
} from '@fortawesome/free-solid-svg-icons';

// Own components
import Header from './components/common/header/Header';

// own Views
import ViewNotFound from './views/common/ViewNotFound';
import MyView from './views/common/MyView';
import Landing from './views/landing/Landing';
import Login from './views/login/Login';
import TwoFactorAuth from './views/login/TwoFactorAuth';
import Dashboard from './views/dashboard/Dashboard';
import Logout from './components/logout/Logout';

library.add(
    faAngleDown,
    faAngleUp,
    faCaretLeft,
    faCaretRight
)

const App: React.FC = () => {
    return (
        <div className="App">
            <Auth>
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route path="/login" component={Login} />
                        <Route path="/2fa" component={TwoFactorAuth} />
                        <Route path="/test" component={MyView} />
                        <Route path="/dashboard" component={Dashboard} />
                        <AuthRoute path="/logout" component={Logout} />
                        <Route component={ViewNotFound} />
                    </Switch>
                </Router>
            </Auth>
        </div>
    );
}

export default App;
