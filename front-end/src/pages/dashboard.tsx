import { TransactionsTypesCard } from "@/components/components/transactions-types-card"
import { AnalyticsCardsContainer } from "@/components/components/analytics-cards-container"
import { CalendarDateRangePicker } from "@/components/components/date-range-picker"
import { AnalyticsIcon } from "@/components/components/icons/analytics-icon"
import { TransactionsTable } from "@/components/components/transactions-table"
import { PayloadData } from "@/types/payload-data"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs"
import { useEffect, useState } from "react"
import { fetchSalesByPageSizeAndNumber } from "@/services/fetch-sales"

export const Dashboard = () => {
  const PAGE_NUMBER_DEFAULT: number = Number(import.meta.env.VITE_DEFAULT_PAGE_NUMBER)
  const PAGE_SIZE_DEFAULT: number = Number(import.meta.env.VITE_DEFAULT_PAGE_SIZE)

  const [sales, setSales] = useState<PayloadData>()
  // eslint-disable-next-line
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_DEFAULT)
  // eslint-disable-next-line
  const [pageNumber, setPageNumber] = useState<number>(PAGE_NUMBER_DEFAULT)
  const [width, setWidth] = useState<number>()

  const handleWindowResize = () => {
    const contentContainer = document.getElementById('radix-:r1:-content-analytics')?.clientWidth;
    setWidth(contentContainer)
  }
  
  useEffect(() => {
      (async () => {
          const result: PayloadData = await fetchSalesByPageSizeAndNumber(pageSize, pageNumber)
          setSales(result)
      })()
  }, [pageNumber, pageSize])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  })

  return (
    <div className="flex justify-center m-4">
      <Tabs defaultValue="analytics" className="flex h-fit bg-sky-200 rounded shadow-lg shadow-gray-400/60">
        <TabsList className="flex flex-col space-y-4 m-2 bg-sky-400 shadow-lg shadow-gray-400/60 rounded p-2">
          <TabsTrigger className="shadow-none text-sky-50" value="analytics">
              <AnalyticsIcon />
          </TabsTrigger>
        </TabsList>
        <TabsContent className="grid m-2 space-y-4" value="analytics">
          <CalendarDateRangePicker className="grid grid-cols-1 justify-self-end bg-sky-50 rouded" setSales={setSales}/>
          <AnalyticsCardsContainer summary={sales?.summary} />
          <TransactionsTypesCard items={sales?.items} width={width || innerWidth/4}/>
            {sales?.items && <TransactionsTable items={sales?.items}/>}
        </TabsContent>
      </Tabs>
    </div>
  )
}