import React, { useEffect, useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null); 

  //fetch list of transactions
  useEffect(() => {
    fetch('http://localhost:5000/transactions')
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error('Error fetching transactions:', error));
  }, []);

  //adds a new transation
  const addTransaction = (transaction) => {
    fetch('http://localhost:5000/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    })
      .then((res) => res.json())
      .then((newTransaction) => {
        setTransactions([...transactions, newTransaction]);
      })
      .catch((error) => console.error('Error adding transaction:', error));
  };

  //delets an existing transaction
  const deleteTransaction = (id) => {
    fetch(`http://localhost:5000/transactions/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTransactions(transactions.filter((transaction) => transaction._id !== id));
      })
      .catch((error) => console.error('Error deleting transaction:', error));
  };

  //edits an existing transaction
  const editTransaction = (id, updatedTransaction) => {
    fetch(`http://localhost:5000/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTransaction),
    })
      .then((res) => res.json())
      .then((updatedData) => {
        setTransactions(
          transactions.map((transaction) =>
            transaction._id === id ? updatedData : transaction
          )
        );
        setEditingTransaction(null);
      })
      .catch((error) => console.error('Error updating transaction:', error));
  };

  //handels form submission
  const handleFormSubmit = (transaction) => {
    if (editingTransaction) {
      editTransaction(editingTransaction._id, transaction);
    } else {
      addTransaction(transaction);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Personal Finance Tracker</h1>

      {/* Transaction Form */}
      <TransactionForm
        onSubmit={handleFormSubmit}
        existingTransaction={editingTransaction}
      />

      {/* Content Container for List and Chart */}
      <div className="content-container">
        {/* Transaction List */}
        <TransactionList
          transactions={transactions}
          onDelete={deleteTransaction}
          onEdit={setEditingTransaction}
        />

        {/* Expense Chart */}
        <ExpenseChart transactions={transactions} />
      </div>
    </div>
  );
}

export default App;
