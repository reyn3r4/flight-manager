// FlightButtons.jsx
import React from 'react';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import { Link } from 'react-router-dom';
 
const FlightButtons = ({ flight, onDelete, onClickImage }) => {
  
  return (
    <strong>
      <IconButton component={Link} to={`/flights/${flight.id}`}>
        <RemoveRedEyeIcon />
      </IconButton>
      <IconButton onClick={() => onDelete(flight.id)}>
        <DeleteIcon />
      </IconButton>
      {(flight.img || flight.row?.img) && (
        <IconButton onClick={() => onClickImage(true, flight)}>
          <ImageIcon />
        </IconButton>
      )}
    </strong>
  );
};
 
export default FlightButtons;
 