// FlightCard.jsx
 
import React from 'react';
import { Card, CardContent, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ImageIcon from '@mui/icons-material/Image';
import FlightButtons from './FlightButtons';
 
const FlightCard = ({ flight, onDelete, onClickImage }) => {
  //console.log(handleDelete)
  return (
    <Card sx={{ margin: 2, padding: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ mb: 1 }}>
          {`Code: ${flight.code}`}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 1 }}>
          {`Capacity: ${flight.capacity}`}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {`Departure Date: ${flight.departureDate}`}
        </Typography>
        <FlightButtons flight={flight} onDelete={onDelete} onClickImage={onClickImage} />
   
      </CardContent>
    </Card>
  );
};
 
export default FlightCard;