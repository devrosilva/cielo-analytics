import {Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card"

export const WelcomeCard = () => {
  return(
      <Card className="bg-sky-50 shadow-lg shadow-gray-400/60 rounded">
        <CardHeader className="grid grid-col-1 pb-2">
          <CardTitle className="text-sm font-medium">
            Welcome to your dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center text-base font-bold">
          
        </CardContent>
    </Card>
  )
}