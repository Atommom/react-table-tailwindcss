import { useMemo, useState } from 'react';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';
import AddressModal from '../AddressModal';

const Table = ({ columns, data, onUpdate }) => {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, selectAddress] = useState();

  const DefaultColumnFilter = ({
    column: { filterValue, setFilter },
  }) => (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
      placeholder="Search"
    />
  );

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const onSelectAddress = (val) => {
    selectAddress(val);
    setShowAddressModal(true);
  };

  const onSubmit = (e, address) => {
    e.preventDefault();
    setShowAddressModal(false);
    onUpdate(address);
  };

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
      defaultColumn,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <>
      <table {...getTableProps()} className="border-collapse border mx-auto">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.sortable ? column.getSortByToggleProps() : undefined)}
                  className="border py-1 px-2 bg-gray-100"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      {column.render('Header')}
                      {column.isSorted && (
                        <span className={column.isSortedDesc ? 'rotate-90' : '-rotate-90'}>
                          {'>'}
                        </span>
                      )}
                    </div>
                    {column.filterable && <div onClick={e => e.stopPropagation()}>{column.render('Filter')}</div>}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="cursor-pointer hover:bg-gray-100" onClick={() => onSelectAddress(row.values)}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="border py-1 px-2">{cell.render('Cell')}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="mt-2 text-center">
        <button onClick={() => gotoPage(0)} className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white py-1 px-2 rounded-lg mr-2" disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white py-1 px-3 rounded-lg mr-2" disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button onClick={() => nextPage()} className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white py-1 px-3 rounded-lg mr-2" disabled={!canNextPage}>
          {'>'}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white py-1 px-2 rounded-lg mr-4" disabled={!canNextPage}>
          {'>>'}
        </button>
        <span className="mr-3">
          Page
          <strong className="ml-1">
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <select
          className="py-1 px-3 rounded border border-blue-500"
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 25].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>

        {showAddressModal && (
          <AddressModal
            onCancel={() => setShowAddressModal(false)}
            onSubmit={onSubmit}
            data={selectedAddress}
          />
        )}
      </div>
    </>
  );
};

export default Table;
