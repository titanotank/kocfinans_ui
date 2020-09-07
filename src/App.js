import React from 'react';
import './App.css';
import Header from './Header'
import CreditApplicationScreen from './CreditApplicationScreen'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <CreditApplicationScreen/>
      </header>
    </div>
  );
}

export default App;
