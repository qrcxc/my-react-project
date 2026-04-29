import React from "react";

const BetHistoryItem = ({ bet }) => {
  return (
    <li className="history-item">
      <div>
        <small>{bet.date}</small>
        <div><strong>{bet.gameType}</strong></div>
      </div>
      <div className="history-amount">
        {Number(bet.potentialWin).toFixed(2)} ₴
      </div>
    </li>
  );
};

export default BetHistoryItem;