import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Slider } from './Slider';
import { toDollarFormat } from './toDollarFormat';

function App() {
  const min = 0;
  const max = 300;
  const minAmount = 150;
  const [amount, setAmount] = useState(minAmount);

  return (
    <div
      style={{
        width: '50%',
        fontFamily: 'Noto Sans, Helvetica Neue, Helvetica, Arial, sans-serif'
      }}
    >
      <p>Minimum Price: {toDollarFormat(minAmount)}</p>

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
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
