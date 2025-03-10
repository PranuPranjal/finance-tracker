# Personal Finance Tracker

A web application for tracking personal finances, allowing users to add, edit, and delete transactions, as well as visualize their monthly expenses through charts.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Frontend](#frontend)
- [Backend](#backend)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **Frontend**: 
  - React
  - Chart.js
  - CSS
  - Axios (for API calls)

- **Backend**: 
  - Node.js
  - Express
  - MongoDB (with Mongoose)
  - Cors (for handling cross-origin requests)

## Features

- Add new transactions with description, amount, and date.
- Edit existing transactions.
- Delete transactions.
- View monthly expenses in a bar chart.
- Responsive design for mobile and desktop.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Clone the Repository
```bash
git clone 
```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory and add your MongoDB connection string:

   ```plaintext
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

## Usage

- Open your browser and navigate to `http://localhost:3000` to access the frontend.
- Use the form to add new transactions.
- Click on the edit button to modify existing transactions.
- Click on the delete button to remove transactions.
- View the monthly expenses chart for a visual representation of your spending.

## Frontend

The frontend is built using React and provides a user-friendly interface for managing transactions. It communicates with the backend API to perform CRUD operations on transaction data.

### Key Components

- **TransactionForm**: A form for adding and editing transactions.
- **TransactionList**: Displays a list of transactions with options to edit or delete.
- **ExpenseChart**: Visualizes monthly expenses using Chart.js.

## Backend

The backend is built using Node.js and Express, providing a RESTful API for managing transactions stored in a MongoDB database.

### API Endpoints

- `GET /transactions`: Retrieve all transactions.
- `POST /transactions`: Create a new transaction.
- `PUT /transactions/:id`: Update an existing transaction.
- `DELETE /transactions/:id`: Delete a transaction.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

