import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// Own components
import Header from './components/common/header/Header';

// own Views
import ViewNotFound from './views/common/ViewNotFound';
import MyView from './views/common/MyView';
import Login from './views/login/Login';
import Auth from './components/auth/Auth';

const App: React.FC = () => {
    return (
        <div className="App">
            <Auth>
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/login" component={Login} />
                        <Route path="/2fa" component={MyView} />
                        <Route path="/test" component={MyView} />
                        <Route component={ViewNotFound} />
                    </Switch>
                </Router>
            </Auth>
        </div>
    );
}

export default App;
