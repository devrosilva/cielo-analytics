import { formatMoney } from "./format-money"

export const getColumns = () => {
  return (
    [
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
  )        
} 