// app/inventory/page.tsx
"use client";
import { ModalComponent } from "./modal";
import React, { useMemo, useState } from "react";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";
import { HeaderFilter, ITableHeader } from "./interface/ITable";
import "./index.css";
import { IFieldType } from "./interface/IField";
import { DataController } from "./class/DataController";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

export function TableComponent<T extends ITableHeader, K>({
  header,
  data,
  field,
  dataController
}: {
  header: T;
  data: K[];
  field: IFieldType;
  dataController: DataController
}) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [crud, setCrud] = useState<TableCRUD>("none");
  const [rowdata, setData] = useState<K[]>(data);

  //* 열데이터 저장
  const [selectedData, setSelectedData] = useState<K | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function makeHeader(columns: T): ColumnDef<K, any>[] {
    return Object.entries(columns).map(([key, value]) => ({
      header: value[0],
      accessorKey: key,
      cell: (info) => info.getValue(),
      meta: GetFilter(value[1]),
    }));
  }

  const columns = useMemo<ColumnDef<K, any>[]>(
    () => makeHeader(header),
    [header]
  );

  const table = useReactTable({
    data: rowdata,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  //* 열 클릭
  const handleRowClick = (row: K) => {
    setCrud("update");
    setSelectedData(row);
    setIsModalOpen(true);
  };

  //* 모달 창 닫기 이벤트
  const handleModalClose = () => {
    setCrud("none");
    setIsModalOpen(false);
    setSelectedData(null);
  };

  //* 모달 창 저장
  const handleSave = (updatedData: K) => {
    setData((prevData) =>
      prevData.map((item) => (item === selectedData ? updatedData : item))
    );
  };

  const handleAddNew = () => {
    setCrud("create");
    setSelectedData(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-2 w-full overflow-scroll">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="bg-gray-200" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="hover:bg-gray-100"
                  key={header.id}
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder ? null : (
                    <>
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} />
                        </div>
                      ) : null}
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => handleRowClick(row.original)}
              className="cursor-pointer hover:bg-gray-200"
            >
              {row.getVisibleCells().map((cell) => (
                <td className="hover:bg-gray-100" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleModalClose}
        data={selectedData}
        onSave={handleSave}
        keys={Object.keys(header) as (keyof K)[]}
        fieldTypes={field}
        crud={crud}
        dataController={dataController}
      />

      <div className="h-2" />
      <div className="flex justify-around w-full bg-gray-200 p-2">
        <div className="w-3/12 flex justify-around">
          <button
            className="border p-2 bg-white rounded-xl hover:border-gray-600"
            onClick={handleAddNew}
          >
            {"+"}
          </button>
          <button
            className="border p-2 bg-white rounded-xl hover:border-gray-600"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="border p-2 bg-white rounded-xl hover:border-gray-600"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="border p-2 bg-white rounded-xl hover:border-gray-600"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="border p-2 bg-white rounded-xl hover:border-gray-600"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1 font-semibold">
          Go to page:
          <input
            title="select_number"
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          title="page"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="border p-1 rounded w-32"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function GetFilter(value: HeaderFilter): any | undefined {
  if (value === "range") {
    return { filterVariant: "range" };
  } else if (value === "select") {
    return { filterVariant: "select" };
  } else return undefined;
}

//* 동적인 헤더 필터 생성 이해완료 :)
function Filter({ column }: { column: Column<any, unknown> }) {
  const { filterVariant } = column.columnDef.meta ?? {};

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = React.useMemo(
    () =>
      filterVariant === "range"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys())
            .sort()
            .slice(0, 5000),
    [column.getFacetedUniqueValues(), filterVariant]
  );

  return filterVariant === "range" ? (
    <div>
      <div className="flex space-x-2 justify-center items-center">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0] !== undefined
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === "select" ? (
    <select
      title="select"
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      <option value="">All</option>
      {sortedUniqueValues.map((value) => (
        //dynamically generated select options from faceted values feature
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  ) : (
    <>
      {/* Autocomplete suggestions from faceted values feature */}
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
}

//* Debounce input
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
