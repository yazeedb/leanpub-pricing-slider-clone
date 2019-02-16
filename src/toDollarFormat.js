export const toDollarFormat = amount =>
  amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
