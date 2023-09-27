import {Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card"
import { DolarIcon } from "./icons/dolar-icon"

export const AnalyticsCard = () => {
  return(
      <Card className="bg-sky-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            NET AMOUNT
          </CardTitle>
          <DolarIcon />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
        </CardContent>
    </Card>
  )
}