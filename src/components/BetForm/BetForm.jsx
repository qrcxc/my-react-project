import React from 'react';
import './BetForm.css'; // ПЕРЕВІР ЦЕЙ РЯДОК

const BetForm = ({ formData, setFormData, onSubmit }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="bet-form" onSubmit={onSubmit}>
      <div className="form-group">
        <label>Сума ставки</label>
        <input 
          type="number" 
          name="betAmount" 
          value={formData.betAmount} 
          onChange={handleChange} 
          placeholder="0.00"
        />
      </div>
      <div className="form-group">
        <label>Коефіцієнт</label>
        <input 
          type="number" 
          step="0.01" 
          name="coefficient" 
          value={formData.coefficient} 
          onChange={handleChange} 
          placeholder="1.01"
        />
      </div>
      <div className="form-group">
        <label>Тип гри</label>
        <select name="gameType" value={formData.gameType} onChange={handleChange}>
          <option value="">Оберіть гру</option>
          <option value="Футбол">⚽ Футбол</option>
          <option value="Казино">🎰 Казино</option>
          <option value="Теніс">🎾 Теніс</option>
        </select>
      </div>
      <button type="submit" className="submit-btn">Додати в історію</button>
    </form>
  );
};

export default BetForm;