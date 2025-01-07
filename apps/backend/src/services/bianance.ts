import WebSocket from 'ws'
import { EventEmitter } from "events"
import { log } from '../utils/logger.js'

const BINANCE_API_URL = process.env.BINANCE_API_URL || ""

export const fetchBinancePrices = ():EventEmitter => {
  const eventEmitter = new EventEmitter()
  const ws = new WebSocket(BINANCE_API_URL)

  ws.on("open", () => {
    log("Connected to Binance WebSocket")

    const subscribeMessage = {
      method: "SUBSCRIBE",
      params: ["btcusdc@ticker", "ethusdc@ticker"],
      id: 1
    }
    ws.send(JSON.stringify(subscribeMessage))
  })

  ws.on("message", (data) => {
    const parseData = JSON.parse(data.toString())
    if(parseData.s && parseData.c){
      eventEmitter.emit("priceUpdate", {
        pair: parseData.s,
        price: parseFloat(parseData.c)
      })
    }
  })

  ws.on("error", (error) => {
    log("Binance WebSocket error",error)
  })

  return eventEmitter
}