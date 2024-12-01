import React, { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { fetchExpenseTransactionsRows, submitExpenseTransactionRow } from '../api';
import EditableCell from './EditableCell';

const DataTable = () => {
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);

    const fetchData = async ({ pageIndex }) => {
        setLoading(true);
        const response = await fetchExpenseTransactionsRows(`${pageIndex + 1}`, 10)
        setData(response.data);
        setTotalRows(response.total);
        setPageCount(Math.ceil(response.total / 10));
        setLoading(false);
    };

    const updateRow = async (updatedRow) => {
        console.log(updatedRow)
        await submitExpenseTransactionRow(updatedRow)
        fetchData({ pageIndex: 0 }); // Refresh data
    };

    const columns = React.useMemo(
        () => [
            { Header: "ID", accessor: "ID", id: "id" },
            { Header: "Category0", accessor: "category0", id: "category0", Cell: EditableCell },
            { Header: "Category1", accessor: "category1", id: "category1", Cell: EditableCell },
            { Header: "Memo0", accessor: "memo0", id: "memo0", Cell: EditableCell },
            { Header: "Memo1", accessor: "memo1", id: "memo1", Cell: EditableCell },
            { Header: "Currency", accessor: "currency", id: "currency" },
            { Header: "Amount", accessor: "amount", id: "amount" },
            { Header: "Source Account", accessor: "source_account", id: "source_account" },
            { Header: "Target Account", accessor: "target_account", id: "target_account" },
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

export default DataTable;
