import { Dispatch, SetStateAction, useEffect, useState} from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"
import { fetchSalesByDate } from "@/services/fetch-sales"
import { PayloadData } from "@/types/payload-data"
import { useToast } from "@/components/ui/use-toast"

type CalendarDateRangePickerData = {
  className: string,
  setSales: Dispatch<SetStateAction<PayloadData | undefined>>
}
export const CalendarDateRangePicker = ({className, setSales}: CalendarDateRangePickerData) => {
  const { toast } = useToast()
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2021, 4, 26),
    to: new Date(2021, 4, 26),
  })

  useEffect(() => {
    (async () => {
      try{
        if(!(date?.from && date?.to)) return
        const result: PayloadData = await fetchSalesByDate(date?.from, date?.to)
        if(Object.values(result).length){
          setSales(result)
        }
        else{
          throw new Error()
        }
      }
      catch{
        toast({
          title: "Dados não encontrados",
          description: "Nenhuma transação encontrada nas datas selecionadas",
          variant: "destructive"
      })}

    })()
  }, [date, setSales, toast])

  return (
    <div className={cn("grid gap-2 rounded mb-4 z-10", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" variant={"outline"}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-sky-50" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}