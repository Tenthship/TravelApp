import express from "express"
import 'dotenv/config'
import cors from 'cors'

const BASE_URL = "https://serpapi.com/search?engine=google_flights"
const flightApiKey = process.env.FLIGHT_API_KEY

const app = express()

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.get("/", (req, res) => {
  res.json({ message: "Flight API is running" })
})

app.get("/flightapi/destination/:destination", async (req, res) => {
  try {

    const { destination } = req.params
    const departureId = req.query.departure || "CDG"
    const outboundData = req.query.date || "2026-03-03"

    const url = `${BASE_URL}&departure_id=${departureId}&arrival_id=${destination}&currency=USD&type=2&outbound_date=${outboundData}&api_key=${flightApiKey}`
    

    const response = await fetch(url)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to fetch flight data" })
  } 
    
})

app.get("/flightapi/airports/:query", async (req, res) => {
  try {
    const { query } = req.params
    
    const url = `https://serpapi.com/search.json?engine=google_flights_autocomplete&q=${encodeURIComponent(query)}&exclude_regions=true&api_key=${flightApiKey}`
    
    const response = await fetch(url)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to fetch airports" })
  }
})

app.listen(3001, () => {
  console.log("Server is running on port 3001")
})