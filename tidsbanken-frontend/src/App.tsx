import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// Own components
import Header from './components/common/header/Header';

// own Views
import ViewNotFound from './views/common/ViewNotFound';
import MyView from './views/common/MyView';
import Login from './views/login/Login';
import TwoFactorAuth from './views/login/TwoFactorAuth';

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/login" component={Login} />
                    <Route path="/2fa" component={TwoFactorAuth} />
                    <Route path="/test" component={MyView} />
                    <Route component={ViewNotFound} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
