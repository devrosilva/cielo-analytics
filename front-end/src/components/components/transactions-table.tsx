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
import { formatMoney } from '@/utils/format-money'

type TransactionsTableData = {
  items: Items
}

export const TransactionsTable = ({ items }: TransactionsTableData) => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 10})
  const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])

  const columns = [
    {
      accessorKey: 'id',
      header: () => <span>Id</span>,
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'date',
      header: () => <span>Data</span>,
      cell: info => {
        const date = new Date(info.getValue()).toDateString()
        return date 
      },
    },
    {
      accessorKey: 'netAmount',
      header: () => <span>Valor líquido</span>,
      cell: info => {
        const amount = info.getValue()
        const formatted = formatMoney(amount)
        return formatted
      } ,
    },
    {
      accessorKey: 'status',
      header: () => <span>Status</span>,
      cell: info => info.getValue(),
    },
  ]

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  }
  const dataQuery = useQuery(
    ['data', fetchDataOptions],
    () => fetchData(fetchDataOptions, items),
    { keepPreviousData: true }
  )

  const table = useReactTable({
    data: dataQuery.data?.rows,
    columns,
    pageCount: 3,
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
      <div className="flex items-center justify-end space-x-2 py-4 pr-4 bg-sky-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </Button>
      </div>
    </div>
  )
}