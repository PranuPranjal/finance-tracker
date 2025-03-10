import React from 'react';

function TransactionList({ transactions, onEdit, onDelete }) {
  return (
    <ul className="transaction-list">
      {transactions.map((transaction) => (
        <li key={transaction._id} className="transaction-item">
          <div className="transaction-details">
            {transaction.description} - ₹{transaction.amount} on {transaction.date.split('T')[0]} 
          </div>
          <div className="transaction-buttons"> 
            <button onClick={() => onEdit(transaction)} className="edit-button">Edit</button>
            <button onClick={() => onDelete(transaction._id)} className="delete-button">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TransactionList;
