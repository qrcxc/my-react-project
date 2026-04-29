import React from 'react';
import './BetResult.css';

const BetResult = ({ result, gameType }) => {
  if (!result) return <div className="bet-result placeholder">Введіть дані...</div>;

  return (
    <div className="bet-result card">
      <h3>Результат для {gameType}</h3>
      <p>Виграш: <strong>{result.win.toFixed(2)} ₴</strong></p>
      <p>Прибуток: <span className="profit">{result.profit.toFixed(2)} ₴</span></p>
    </div>
  );
};

export default BetResult;