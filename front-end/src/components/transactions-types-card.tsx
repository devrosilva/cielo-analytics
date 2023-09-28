import { Items } from "@/types/items"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

type CardBottomLeftData = {
    items: Items | undefined
}

type Stats = {
    name: string
    total: number
}

export const TransactionsTypesCard = ({ items }: CardBottomLeftData) => {
    const stats: { [key: string]: number } = {}
    items && Object.values(items).map(v => {
        const k = v.channel.includes('/') ? v.channel.split('/')[0].trim() : v.channel
        Object.keys(stats).includes(k) ? stats[k] += 1 : stats[k] = 0
    })
    const data: Stats[] = []
    Object.keys(stats).map(stat => {
        data.push({name: stat, total: stats[stat]})
    })

  return (
    <div className="grid grid-cols-1 h-min bg-sky-50 shadow-lg shadow-gray-400/60 rounded">
        <BarChart margin={{left: -35, right: 10, top: 10, bottom: -5}} width={300} height={150} data={data}>
            <XAxis
            dataKey="name"
            stroke="#555"
            fontSize={12}
            />
            <YAxis
            stroke="#555"
            fontSize={12}
            />
            <Bar barSize={25} dataKey="total" fill="#8884d8" />
        </BarChart>
    </div>
  )
}