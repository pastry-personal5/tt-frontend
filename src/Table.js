import React, { useState } from "react";
import { useReactTable, flexRender, createColumnHelper, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import "./index.css";

const EditableTable = ({ columns, data, onSave }) => {

  const [editableRowIndex, setEditableRowIndex] = useState(null);
  const [editedRow, setEditedRow] = useState(null);

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const rerender = React.useReducer(() => ({}), {})[1]

  const tableInstance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // Pagination
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  const startEditing = (rowIndex) => {
    setEditableRowIndex(rowIndex);
    setEditedRow({ ...data[rowIndex] });
  };

  const saveRow = (rowIndex) => {
    onSave(editedRow); // Trigger save callback
    setEditableRowIndex(null);
  };

  return (
    <div className="p-2">
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.Header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {tableInstance.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  )
};

export default EditableTable;

