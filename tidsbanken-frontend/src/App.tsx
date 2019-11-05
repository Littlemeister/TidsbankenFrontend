import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// Own components
import Header from './components/common/header/Header';
import ViewNotFound from './views/common/ViewNotFound';
import MyView from './views/common/MyView';

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={MyView} />
                    <Route path="/login" component={MyView} />
                    <Route path="/2fa" component={MyView} />
                    <Route component={ViewNotFound} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
