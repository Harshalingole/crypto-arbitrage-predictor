import express, { Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

const app:Application = express()

//Express Configuration 
app.set("port",process.env.PORT)


// Middleware
app.use(cors({origin: process.env.CORS_ORIGIN}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


// Api Routes

app.use("/", (req,res,next) => {
  res.send("Crypto Arbitrage Predictor")
})



export default app
