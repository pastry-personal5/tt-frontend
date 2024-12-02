import React, { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { fetchExpenseTransactionsMonthlyAnalysisRows, fetchExpenseCategoriesForCountOfDistinctNames, fetchExpenseTransactionsMonthlyAnalysisForCountOfDistinctMonths } from '../api';


const ExpenseTransactionsMonthlyAnalysis = () => {
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);

    const buildHumanFriendlyAmount = (src) => {
        return src.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const fetchData = async ({ pageIndex }) => {
        setLoading(true);
        const count_of_distinct_names = await fetchExpenseCategoriesForCountOfDistinctNames()
        const count_of_distinct_months = await fetchExpenseTransactionsMonthlyAnalysisForCountOfDistinctMonths()
        const recommendedPageSize = count_of_distinct_names
        const response = await fetchExpenseTransactionsMonthlyAnalysisRows(`${pageIndex + 1}`, recommendedPageSize)
        const rawData = response.data
        var processedData = []
        for (const item of rawData) {
            console.log(item)
            var newItem = {}
            newItem.month = item.month
            newItem.category0 = item.category0
            newItem.total_sum = buildHumanFriendlyAmount(item.total_sum);
            processedData.push(newItem)
        }
        setData(processedData);
        setTotalRows(response.total);
        setPageCount(Math.ceil(response.total / recommendedPageSize));
        setLoading(false);
    };

    const updateRow = async (updatedRow) => {
        console.log(updatedRow)
        fetchData({ pageIndex: 0 }); // Refresh data
    };

    const columns = React.useMemo(
        () => [
            { Header: "Month", accessor: "month", id: "month"},
            { Header: "Major Category", accessor: "category0", id: "category0"},
            { Header: "Amount", accessor: "total_sum", id: "total_sum" },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount: controlledPageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
            manualPagination: true,
            pageCount,
            updateRow,
        },
        usePagination
    );

    useEffect(() => {
        fetchData({ pageIndex });
    }, [pageIndex]);

    return (
        <div>
            <table {...getTableProps()} className="table table-bordered">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell', {
                                            updateRow,
                                            value: cell.value,
                                            row: row.original,
                                            columnId: cell.column.id,
                                        })}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>
                <button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
            </div>
        </div>
    );
};

export default ExpenseTransactionsMonthlyAnalysis;