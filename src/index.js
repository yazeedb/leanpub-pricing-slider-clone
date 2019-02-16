import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Slider } from './Slider';
import { toDollarFormat } from './toDollarFormat';
import './App.scss';

function App() {
  const min = 0;
  const max = 300;
  const minAmount = 150;
  const [amount, setAmount] = useState(minAmount);

  return (
    <div className="app">
      <nav>
        <h2>Leanpub Pricing Slider</h2>
      </nav>

      <div className="content">
        <p>
          Minimum Price: <span>{toDollarFormat(minAmount)}</span>
        </p>

        <Slider
          primary={true}
          label="You Pay"
          amount={amount}
          min={min}
          max={max}
          onChange={amountPercentage => {
            const chosenAmount = max * amountPercentage;
            const minAmountPercentage = minAmount / max;

            const newAmount =
              amountPercentage > 1
                ? max
                : amountPercentage < minAmountPercentage
                ? minAmount
                : chosenAmount;

            setAmount(newAmount);
          }}
        />

        <Slider
          primary={false}
          label="Author Earns"
          amount={amount * 0.8}
          min={min}
          max={max}
        />
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
