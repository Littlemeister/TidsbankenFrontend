import React from 'react';
// import logo from './logo.svg';
import './App.css';

// Own components
import Header from './components/common/header/Header';
import Login from './views/login/Login';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Login />
    </div>
  );
}

export default App;
