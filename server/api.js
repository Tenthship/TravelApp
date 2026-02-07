import express from "express"
import cors from 'cors'

const app = express()
app.use(cors())
const BASE_URL = "https://booking-com15.p.rapidapi.com"

app.get("/flightapi/destination/:destination", async (req, res) => {
  const { destination } = req.params

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/flights/searchDestination?query=${encodeURIComponent(destination)}`,
      {
        headers: {
          'x-rapidapi-key': '5557b9ca91msh4e3b58f33ae6a32p123debjsn37d188387e7a',
          'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
        },
      }
    )

    if (!response.ok) {
      const text = await response.text()
      return res.status(response.status).json({
        error: "RapidAPI request failed",
        status: response.status,
        details: text,
      })
    }

    const data = await response.json()
    return res.json(data)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Server error" })
  }
})

app.listen(3001, () => console.log("server on 3001"))
