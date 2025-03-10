const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

//connects to mongoDB
mongoose.connect('mongodb://localhost:27017/finance', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const transactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  date: Date,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

//Routes
app.get('/transactions', async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

//add a new transaction
app.post('/transactions', async (req, res) => {
  const { description, amount, date } = req.body;
  const transaction = new Transaction({ description, amount, date });
  await transaction.save();
  res.json(transaction);
});

//update an existing transaction
app.put('/transactions/:id', async (req, res) => {
    const { description, amount, date } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { description, amount, date },
      { new: true }
    );
    res.json(transaction);
  });

//delete transaction
app.delete('/transactions/:id', async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: 'Transaction deleted' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
