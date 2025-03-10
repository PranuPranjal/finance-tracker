import React, { useState, useEffect } from 'react';

function TransactionForm({ onSubmit, existingTransaction }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: '',
  });

  useEffect(() => {
    if (existingTransaction) {
      setFormData({
        description: existingTransaction.description,
        amount: existingTransaction.amount,
        date: existingTransaction.date.split('T')[0], 
      });
    } else {
      setFormData({
        description: '',
        amount: '',
        date: '',
      });
    }
  }, [existingTransaction]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ description: '', amount: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="form-input"
      />
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
        className="form-input"
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="form-input"
      />
      <button type="submit" className="form-button">
        {existingTransaction ? 'Update Transaction' : 'Add Transaction'} {/* Conditional button text */}
      </button>
    </form>
  );
}

export default TransactionForm;