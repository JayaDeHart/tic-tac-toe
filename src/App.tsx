import React from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <Game size={600} />
    </div>
  );
}

export default App;
