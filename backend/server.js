import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import errorMiddleware from './middleware/errorMiddleware.js'
import dotenv from 'dotenv'

dotenv.config()
connectDB()
const app = express()

app.use(cors({
  origin: allowedOrigins, 
  credentials: true, 
}))

app.use(express.json())

app.get('/', (req,res) => {
    res.send('API is running...')
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})

app.use(errorMiddleware)