import 'dotenv/config.js'
import express from 'express'
import cors from 'cors'
import connectDb from './database/connect.js'
import { userAuth } from './routes/auth/routes.js'
import { foodList } from './routes/food/routes.js'
import { formRouter } from './routes/form/route.js'
import cookieParser from 'cookie-parser'
import orderRouter from './routes/orders/routes.js'

let app = express()

let PORT = process.env.PORT || 4000

connectDb()

app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL]
}))
app.use(express.json())
app.use('/api/auth', userAuth)
app.use('/api/food', foodList)
app.use('/api/order', orderRouter)
app.use('/api/contact', formRouter)
app.use(cookieParser())
app.use(express.static("uploads"))

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})