
import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Replace with your backend URL

// ExpenseTransactions.
// Fetch all rows.
export const fetchExpenseTransactionsRows = async (page, pageSize) => {
    const response = await axios.get(`${BASE_URL}/expense_transactions/?page=${page}&page_size=${pageSize}`);
    return response.data; // Assuming API returns a JSON array
};

// Submit a modified row.
export const submitExpenseTransactionRow = async (expense_transaction) => {
    const response = await axios.post(`${BASE_URL}/expense_transactions/${expense_transaction.ID}`, expense_transaction);
    return response.data;
};

// ExpenseTransactionsMonthlyAnalysis.
// Fetch all rows.
export const fetchExpenseTransactionsMonthlyAnalysisRows = async (page, pageSize) => {
    const response = await axios.get(`${BASE_URL}/expense_transactions_monthly_analysis/?page=${page}&page_size=${pageSize}`);
    return response.data; // Assuming API returns a JSON array
};

// Fetch count of distinct months
export const fetchExpenseTransactionsMonthlyAnalysisForCountOfDistinctMonths = async (page, pageSize) => {
    const response = await axios.get(`${BASE_URL}/expense_transactions_monthly_analysis/count_of_distinct_months/`);
    return response.data.total; // Assuming API returns a JSON
};

// ExpenseCategories
export const fetchExpenseCategoriesForCountOfDistinctNames = async (page, pageSize) => {
    const response = await axios.get(`${BASE_URL}/expense_categories/count_of_distinct_names/`);
    console.log(response)
    return response.data.total; // Assuming API returns a JSON
};
