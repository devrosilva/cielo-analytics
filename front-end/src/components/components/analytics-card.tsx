import {Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card"
import formatMoney from "@/utils/formatMoney"

type AnalyticsCardData = {
  title: string
  value: string | number | undefined
}

export const AnalyticsCard = ({ title, value }: AnalyticsCardData) => {
  return(
      <Card className="bg-sky-50 shadow-lg shadow-gray-400/60 rounded m-1">
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-1.5 p-6 font-bold">
          <div>{formatMoney(String(value))}</div>
        </CardContent>
    </Card>
  )
}