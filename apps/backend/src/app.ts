import express, { Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { createServer } from 'http'
import {Server as SocketIOServer} from 'socket.io'
import { log } from './utils/logger.js'

// Load enviornment variable
const result = dotenv.config()
if(result.error){
  throw new Error("Failed to load enviornment variable. Please check .env file")
}

const app:Application = express()
export const httpServer = createServer(app)
const io = new SocketIOServer(httpServer,{
  cors: {
    origin: process.env.CORS_ORIGIN
  }
})

//Express Configuration 
const PORT = process.env.PORT || 3000
app.set("port",PORT)


// Middleware
app.use(cors({origin: process.env.CORS_ORIGIN}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


// WebSocket Connection
io.on("connection",(socket) => {
  log("New client connected")

  socket.on("disconnect",() => {
    log("Client disconnected")
  })
})


app.use("/", (req,res,next) => {
  res.send("Crypto Arbitrage Predictor")
})


export default app
