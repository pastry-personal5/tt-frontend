
import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Replace with your backend URL

// Fetch all rows
export const fetchExpenseTransactionsRows = async (page, pageSize) => {
    const response = await axios.get(`${BASE_URL}/expense_transactions/?page=${page}&page_size=${pageSize}`);
    return response.data; // Assuming API returns a JSON array
};

// Submit a modified row
export const submitExpenseTransactionRow = async (expense_transaction) => {
    const response = await axios.post(`${BASE_URL}/expense_transactions/${expense_transaction.ID}`, expense_transaction);
    return response.data;
};
