import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthRoute from './components/auth/AuthRoute';
import { library } from '@fortawesome/fontawesome-svg-core';
import './App.css';
import {
    faAngleDown,
    faAngleUp,
} from '@fortawesome/free-solid-svg-icons';

// Own components
import Header from './components/common/header/Header';

// own Views
import ViewNotFound from './views/common/ViewNotFound';
import MyView from './views/common/MyView';
import ProfileView from './views/profil/ProfileView';
import Landing from './views/landing/Landing';
import Login from './views/login/Login';
import TwoFactorAuth from './views/login/TwoFactorAuth';
import Logout from './components/logout/Logout';

library.add(
    faAngleDown,
    faAngleUp,
)

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route path="/login" component={Login} />
                        <Route path="/2fa" component={TwoFactorAuth} />
                        <AuthRoute path="/test" component={MyView} />
                        <AuthRoute path="/profil" component={ProfileView} />
                        <AuthRoute path="/logout" component={Logout} />
                        <Route component={ViewNotFound} />
                    </Switch>
            </Router>
        </div>
    );
}

export default App;
