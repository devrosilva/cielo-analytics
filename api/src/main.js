import express from "express"
import cors from "cors"
import data from "../sales.json" assert { type: 'json' };

const app = express()
app.use(cors())
app.use(express.json())


function paginate(array, pageSize, pageNumber) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}


app.get("/sales", async (req, res) => {
    const keys = Object.keys(req.query)
    let sales = data
    if(keys.includes('pageSize') && keys.includes('pageSize')){
        setTimeout(() => res.json(sales), 100)
    }
    else if (keys.includes('to') && keys.includes('from')) {
        console.log('Inside else if')
        const params = req.query
        if(data.summary.initialDate === params.to && data.summary.finalDate === params.from){
            console.log('Inside request')
            setTimeout(() => res.json(sales), 100)
        }
        else return res.json({})
    }
    console.log('Req', req.query)
})

app.listen(3000, () => {
    console.log("Server started at port 3000")
})