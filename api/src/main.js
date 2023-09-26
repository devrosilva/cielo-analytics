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
    let sales = data
    // if (req.query?.pageSize || req.query?.pageNumber) {
    //     sales = paginate(sales.items, req.query?.pageSize, req.query?.pageNumber)
    // }
    setTimeout(() => res.json(sales), 100)
})

app.listen(3000, () => {
    console.log("Server started at port 3000")
})