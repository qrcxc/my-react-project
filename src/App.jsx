import React, { useState, useEffect, useMemo } from 'react';
import BetForm from './components/BetForm/BetForm';
import BetResult from './components/BetResult/BetResult';
import BetHistory from './components/BetHistory/BetHistory';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    betAmount: '',
    coefficient: '',
    gameType: ''
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('betHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Збереження історії
  useEffect(() => {
    localStorage.setItem('betHistory', JSON.stringify(history));
  }, [history]);

  // Розрахунок виграшу (real-time)
  const result = useMemo(() => {
    const amount = parseFloat(formData.betAmount);
    const coeff = parseFloat(formData.coefficient);
    if (isNaN(amount) || isNaN(coeff) || amount <= 0 || coeff < 1.01) return null;
    const win = amount * coeff;
    return { win, profit: win - amount };
  }, [formData.betAmount, formData.coefficient]);

  const handleAddBet = (e) => {
    e.preventDefault();
    if (result && formData.gameType) {
      const newBet = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        amount: formData.betAmount,
        gameType: formData.gameType,
        potentialWin: result.win.toFixed(2)
      };
      setHistory(prev => [newBet, ...prev].slice(0, 5)); // Макс 5 записів
    }
  };

  return (
    <div className="app-container">
      <h1>🎰 Betting Calculator</h1>
      <div className="main-layout">
        <div className="input-side">
          <BetForm formData={formData} setFormData={setFormData} onSubmit={handleAddBet} />
          <BetResult result={result} gameType={formData.gameType} />
        </div>
        <BetHistory history={history} onClear={() => setHistory([])} />
      </div>
    </div>
  );
}

export default App;