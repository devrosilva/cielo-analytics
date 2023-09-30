import { SumaryData } from "@/types/sumary-data"
import { AnalyticsCard } from "./analytics-card"

type TopCardsData = {
    summary: SumaryData | undefined
}
  
export const AnalyticsCardsContainer = ({ summary }: TopCardsData) => {
    const sumaryTitles = {
        totalAmount: 'TOTAL AMOUNT',
        totalNetAmount: 'NET AMOUNT',
        totalAverageAmount: 'AVERAGE AMOUNT'
    }

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2">
            {Object.keys(sumaryTitles).map((title): keyof typeof sumaryTitles => {
                return (
                    <AnalyticsCard 
                        title={sumaryTitles[title as keyof typeof sumaryTitles]} 
                        value={summary && summary[title as keyof SumaryData]}
                        key={title}
                    />
                )
            })}
        </div>
    )
}