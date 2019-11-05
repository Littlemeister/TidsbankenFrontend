import React from 'react';
import logo from './logo.svg';
import './App.css';

/* OWN COMPONENTS */
import Header from './components/common/header/Header';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
