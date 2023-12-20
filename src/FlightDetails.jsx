// src/components/FlightDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
 
const FlightDetails = () => {
  // Obtén el flightId de los parámetros de la URL
  const { flightId } = useParams();
 
  // Lógica para obtener y mostrar los detalles del vuelo con flightId
  // ...
 
  return (
    <div>
      <h2>Flight Details</h2>
      {/* Mostrar los detalles del vuelo */}
      <p>Flight ID: {flightId}</p>
      {/* Agrega más detalles según sea necesario */}
    </div>
  );
};
 
export default FlightDetails;