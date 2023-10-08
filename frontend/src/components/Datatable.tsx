import React, { FC } from "react";
import { useTable, usePagination } from "react-table";
type dtprops = {
  data: {
    model_name: string;
    model_type: string;
    name: string;
    sales: Number;
    year: Number;
  }[];
  columns: {
    Header: string;
    accessor: string
  }[];
  initialState: {
    pageSize: Number;
    pageIndex: Number;
  };
}
const DataTable: FC<dtprops> = (props) => {
  // Memos
  const data = React.useMemo(() => props.data, [props.data]);
  const columns = React.useMemo(() => props.columns, [props.columns]);
  const initialState = React.useMemo(() => props.initialState, [props.initialState]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState
    },
    usePagination
  );
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th style={{color:"white"}} {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <a href="#" onClick={() => gotoPage(0)} >
          {"<<"}
        </a>{" "}
        <a href="#" onClick={() => previousPage()}>
          {"<"}
        </a>{" "}
        <a href="#" onClick={() => nextPage()}>
          {">"}
        </a>{" "}
        <a href="#" onClick={() => gotoPage(pageCount - 1)}>
          {">>"}
        </a>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "30px" }}
          />
        </span>{" "}
      </div>
    </>
  );
};

export default DataTable;