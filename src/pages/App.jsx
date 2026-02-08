import React from 'react'
import TravelDestination from '../components/TravelDestination';
import { IoIosPin } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const App = () => {

  const navigate = useNavigate()
  
  const [departureDestination, setDepartureDestination] = useState(null)
  const [arrivalDestination, setArrivalDestination] = useState(null)
  const [departureData, setDepartureData] = useState(null)
  const [arrivalData, setArrivalData] = useState(null)

const fetchFlight = async (destination) => {
    const res = await fetch(`http://localhost:3001/flightapi/airports/${destination}`)
    const data = await res.json()
    return data
}

  const fetchFlights = async () => {
    const departure = await fetchFlight(departureDestination)
    const arrival = await fetchFlight(arrivalDestination)
    setDepartureData(departure)
    setArrivalData(arrival)

    await navigate(`/destination/${departureDestination}/${arrivalDestination}`)


  }

  if (departureData) {
    const departureSuggestions = departureData.suggestions

    departureSuggestions.map((data) => {
      console.log(data.id)
    })
  }



  return (


    <div>
      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mt-80">
        <IoIosPin className="text-white text-2xl" />
      </div>
      <h1 className="text-center text-3xl font-bold mt-5 mb-3">Budget Travel Planner</h1>
      <h4 className="text-center text-xs">Discover affordable itineraries for your next adventure</h4>

      <div className="mx-auto mt-10 w-60 bg-gray-100 rounded-lg h-100 w-[60rem] p-8 flex flex-col">
        <h4 className="mb-2">Where are you leaving from?</h4>

        <div className="relative mb-3">
          <IoIosPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input className="border border-gray-300 rounded-lg p-3 pr-10 w-full" placeholder='Enter a city or country (e.g., Tokyo, Paris, Thailand)' value={departureDestination} onChange={(e) => {setDepartureDestination(e.target.value)}}></input>
        </div>

        <h4 className="mb-2">Where do you want to go?</h4>

        <div className="relative">
          <IoIosPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input className="border border-gray-300 rounded-lg p-3 pr-10 w-full" placeholder='Enter a city or country (e.g., Tokyo, Paris, Thailand)' value={arrivalDestination} onChange={(e) => {setArrivalDestination(e.target.value)}}></input>
        </div>
        
        <button className="w-full bg-blue-100 rounded-lg mt-3 flex flex-row p-3 gap-3 justify-center items-center cursor-pointer" onClick={fetchFlights}>
          <CiSearch className="text-center text-xl"/>
          <p className="text-center">Find Cheap Itineraries</p>
        </button>

        <hr className="border-gray-300 my-5" />
        <h4>Popular destinations:</h4>
        <div className="flex flex-row gap-3 mt-3 overflow-x-auto">

            <TravelDestination destination="Tokyo"/>
            <TravelDestination destination="Paris"/>
            <TravelDestination destination="Bankok"/>
            <TravelDestination destination="Barcelona"/>
            <TravelDestination destination="Rome"/>
            <TravelDestination destination="Bali"/>
        </div>

      </div>
    </div>
  )
}

export default App