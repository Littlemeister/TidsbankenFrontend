import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// Own components
import Header from './components/common/header/Header';
import MyEmptyComponent from './components/common/MyEmptyComponent';

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <Header />
                <Switch>
                    <Route path="/login" component={MyEmptyComponent} />
                    <Route path="/2fa" component={MyEmptyComponent} />
                    <Route exact path="/" component={MyEmptyComponent} />
                    <Route component={MyEmptyComponent} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
