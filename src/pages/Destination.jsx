import React from 'react'
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'


const Destination = () => {
    const {departure, destination} = useParams()
    const [departureAirports, setDepartureAirports] = useState(null)
    const [arrivalAirports, setArrivalAirports] = useState(null)

    const getAirports = async(query) => {
        try {
            const response = await fetch(`http://localhost:3001/flightapi/airports/${query}`)
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const dep = await getAirports(departure)
            const arr = await getAirports(destination)
            setDepartureAirports(dep)
            setArrivalAirports(arr)
        }
        fetchData()
    }, [departure, destination])

    if (!departureAirports || !arrivalAirports) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div>departure: {JSON.stringify(departureAirports.suggestions.map((airport) => airport.id))}</div>
            <div>destination: {JSON.stringify(arrivalAirports.suggestions.map((airport) => airport.id))}</div>
        </div>
    )
}

export default Destination