const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

//CORS configuration
const corsOptions = {
  origin: 'https://finance-tracker-jafx.vercel.app/',
  optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions)); 
app.use(bodyParser.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

const transactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  date: Date,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

app.post('/api/transactions', async (req, res) => {
  const { description, amount, date } = req.body;
  try {
    const transaction = new Transaction({ description, amount, date });
    await transaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add transaction' });
  }
});

app.put('/api/transactions/:id', async (req, res) => {
  const { description, amount, date } = req.body;
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { description, amount, date },
      { new: true }
    );
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update transaction' });
  }
});

app.delete('/api/transactions/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
});

module.exports = app;
