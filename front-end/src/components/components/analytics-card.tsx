import {Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card"
import { formatMoney } from "@/utils/format-money"

type AnalyticsCardData = {
  title: string
  value: string | number | undefined
}

export const AnalyticsCard = ({ title, value }: AnalyticsCardData) => {
  return(
      <Card data-testid={"analytics-card"} className="bg-sky-50 shadow-lg shadow-gray-400/60 rounded">
        <CardHeader className="flex flex-col space-y-0 p-5 font-bold">
          <CardTitle className="text-sm font-medium">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-0 p-5 font-bold">
          <div>{formatMoney(String(value))}</div>
        </CardContent>
    </Card>
  )
}