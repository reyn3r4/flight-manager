// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import { Paper, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import axios from 'axios';
import BadRequestPage from './BadRequestPage.jsx';
import FlightForm from './FlightForm.jsx';
import FlightDetails from './FlightDetails.jsx';
import FlightList from './FlightList.jsx';
import Navigation from './Navigation.js';


const App= () => {
  const [flights, setFlights] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlightFormOpen, setIsFlightFormOpen] = useState(false);

 //  const navigate = useNavigate();
 // const { currentPage } = useParams();
 
  const fetchFlights = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/flights?page=${currentPage}`);
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };
 
  useEffect(() => {
    fetchFlights();
  }, [currentPage]);

  const updateURL=()=>{ 
    window.history.pushState(null, null, `/flights?page=${currentPage}`);}

  const handlePageChange = (page) => {
    /* let nextPage;
    if (page === 'prev' && currentPage > 1) {
      nextPage = parseInt(currentPage, 10) - 1;
    } else if (page === 'next') {
      nextPage = parseInt(currentPage, 10) + 1;
    } else {
      nextPage = parseInt(currentPage, 10);
    } */
    setCurrentPage((prevPage) => {
      if (page === 'prev' && prevPage > 1) {
        return prevPage - 1;
      } else if (page === 'next') {
        return prevPage + 1;
      }
  
      return prevPage;
    }); 
    updateURL(currentPage)
    // navigate(`/flights?page=${nextPage}`);
  };
  
 
  const handleOpenFlightForm = () => {
    setIsFlightFormOpen(true);
  };
 
  const handleFlightUpdate = () => {
    fetchFlights();
  };
 
  const handleCloseFlightForm = () => {
    setIsFlightFormOpen(false);
  };
 
 /* const handleSubmitFlightForm = (formData) => {
    // Perform flight creation logic here, including sending data to the server
    console.log('Flight Form Data:', formData);
 
    // Close the FlightForm
    handleCloseFlightForm();
  }; */
 
  const handleDelete = async (flightId) => {
    try {
      await axios.delete(`http://localhost:8000/flights/${flightId}`);
      // Lógica adicional después de la eliminación (recargar vuelos, etc.)
      // ...
    } catch (error) {
      console.error('Error deleting flight:', error);
      alert('Error deleting flight. Please try again.');
    }
  };
 
  return (
    <Router>
      <Paper style={{ margin: '16px', padding: '16px', display:'flex', flexDirection:'column',alignItems:'flex-end' }}>
        <IconButton  onClick={handleOpenFlightForm}><Add/></IconButton>
        <FlightForm
          open={isFlightFormOpen}
          onClose={handleCloseFlightForm}
          onSubmit={handleFlightUpdate}
          onDelete={handleDelete}
          onUpdate={handleFlightUpdate}
        />
        <Routes>
          <Route path="/" element={<Navigate to={`/flights?page=${currentPage}`} replace/>} />
          <Route
            path={`/flights?page=${currentPage}`}
            element={<FlightList flights={flights} onDelete={handleDelete} onUpdate={handleFlightUpdate}/>}
            
          />
          <Route
            path="/flights/:flightId"  
            element={<FlightDetails />}
            
          />
          <Route
            path="/bad-request"
            element={<BadRequestPage />}
            
          />
          <Route
            path="*"
            element={<Navigate to="/bad-request" replace />}  
          />
          
        </Routes>
        
        <Navigation onPageChange={handlePageChange} />
      </Paper>
    </Router>
  );
};
 
export default App;