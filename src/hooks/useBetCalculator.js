import { useState, useEffect, useMemo } from 'react';

export const useBetCalculator = () => {
  const [formData, setFormData] = useState({ betAmount: '', coefficient: '', gameType: '' });
  const [errors, setErrors] = useState({});
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('betHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Real-time розрахунок
  const result = useMemo(() => {
    const amount = parseFloat(formData.betAmount);
    const coeff = parseFloat(formData.coefficient);
    if (isNaN(amount) || isNaN(coeff) || amount <= 0 || coeff < 1.01) return null;
    const win = amount * coeff;
    return { win: win.toFixed(2), profit: (win - amount).toFixed(2) };
  }, [formData.betAmount, formData.coefficient]);

  useEffect(() => {
    localStorage.setItem('betHistory', JSON.stringify(history));
  }, [history]);

  const validate = () => {
    const newErrors = {};
    const amount = parseFloat(formData.betAmount);
    const coeff = parseFloat(formData.coefficient);

    if (!formData.betAmount) newErrors.betAmount = 'Введіть суму';
    else if (amount <= 0) newErrors.betAmount = 'Сума має бути > 0';
    else if (amount > 100000) newErrors.betAmount = 'Максимум 100 000';

    if (!formData.coefficient) newErrors.coefficient = 'Введіть коефіцієнт';
    else if (coeff < 1.01) newErrors.coefficient = 'Мін. 1.01';

    if (!formData.gameType) newErrors.gameType = 'Оберіть гру';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addToHistory = () => {
    if (validate() && result) {
      const newBet = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        amount: formData.betAmount,
        coefficient: formData.coefficient,
        gameType: formData.gameType,
        potentialWin: result.win,
        profit: result.profit,
      };
      setHistory(prev => [newBet, ...prev].slice(0, 5));
    }
  };

  return { formData, setFormData, errors, history, setHistory, result, addToHistory };
};