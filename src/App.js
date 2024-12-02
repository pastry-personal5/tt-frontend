import React from 'react';
import DataTable from './components/DataTable';
import ExpenseTransactionsMonthlyAnalysis from './components/ExpenseTransactionsMonthlyAnalysis';

const App = () => {
    return (
        <div className="container mt-5">
            <h1>Transaction Transformer (Work In Progress)</h1>
            <DataTable />
            <ExpenseTransactionsMonthlyAnalysis />
        </div>
    );
};

export default App;

