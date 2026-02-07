import React from 'react'

const TravelDestination = ({ destination }) => {
  return (
  <button className="bg-gray-200 rounded-4xl px-4 cursor-pointer">
    {destination}
  </button>

  )
}

export default TravelDestination