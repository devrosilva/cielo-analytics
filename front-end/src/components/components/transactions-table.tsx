import { Items } from '@/types/items'
import {
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useQuery } from 'react-query'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { useMemo, useState } from 'react'
import { fetchData } from '@/utils/fetch-data'
import { getPageCount } from '@/utils/get-page-count'
import { getColumns } from '@/utils/get-table-columns'

type TransactionsTableData = {
  items: Items
}

export const TransactionsTable = ({ items }: TransactionsTableData) => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 5})

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  }
  const dataQuery = useQuery(
    ['data', fetchDataOptions],
    () => fetchData(fetchDataOptions, items),
    { keepPreviousData: true }
  )
  const defaultData = useMemo(() => [], [])
  const columns = getColumns()
  const pageCount = getPageCount(Object.values(items).length, pageSize)
  const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])

  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    columns,
    pageCount: pageCount,
    state: {pagination},
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <Table className='bg-sky-50 rounded'>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>))}
          </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex justify-between items-center bg-sky-50'>
        <div className=''>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
            className='flex ml-2 p-1 border-solid bg-sky-50 border-solid border-2 border-sky-300 rounded'
          >
            {[5, 10, 15, 20, 25].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex space-x-2 py-4 pr-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className='border-2 border-sky-300 rounded'
          >
            {'<'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className='border-2 border-sky-300 rounded'
          >
            {'>'}
          </Button>
        </div>
      </div>
    </div>
  )
}