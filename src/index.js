import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';

function App() {
  return (
    <div className="app">
      <nav>
        <h2>Leanpub Pricing Slider</h2>
      </nav>

      <div className="content" />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
