import React from "react";
import BetHistoryItem from "../BetHistoryItem/BetHistoryItem";
import "./BetHistory.css";

const BetHistory = ({ history, onClear }) => {
  return (
    <div className="history-container">
      <div className="history-header">
        <h3>Історія (макс. 5)</h3>
        {history.length > 0 && (
          <button onClick={onClear} className="clear-btn">Очистити</button>
        )}
      </div>
      
      {history.length === 0 ? (
        <p className="empty">Ставок ще немає</p>
      ) : (
        <ul className="history-list">
          {history.map((bet) => (
            <BetHistoryItem key={bet.id} bet={bet} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default BetHistory;