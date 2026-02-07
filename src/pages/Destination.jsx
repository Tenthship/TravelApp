import React from 'react'
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'


const Destination = () => {
    const [flightData, setFlightData] = useState(null)
    const {destination} = useParams()

    useEffect(() => {
        fetch(`http://localhost:3001/flightapi/destination/${destination}`)
            .then(res => res.json())
            .then(data => setFlightData(data))
            .catch(err => console.error(err))
    }, [destination])

    if (!flightData) {
        return <div>Loading...</div>
    }

    return (
        <div>{JSON.stringify(flightData)}</div>
    )
}

export default Destination