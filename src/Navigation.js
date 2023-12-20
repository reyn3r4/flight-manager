// src/components/Navigation.js
import React from 'react';
import { ButtonGroup, IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useParams } from 'react-router-dom';
 
const Navigation = ({ onPageChange }) => {
  /* const { page } = useParams();

  const handlePageChange = (newPage) => {
    // Actualiza solo la parte de la URL que necesitas
    history.push(`/flights?page=${newPage}`);
  }; */
  return (
    <ButtonGroup style={{ margin: '16px', display: 'flex',justifyContent: 'flex-end',flexDirection: 'row' }}>
      <IconButton onClick={() => onPageChange('prev')}> <KeyboardArrowLeftIcon /> </IconButton>
      <IconButton onClick={() => onPageChange('next')}> <KeyboardArrowRightIcon /></IconButton>
      {/* Add more controls as needed */}
    </ButtonGroup>
  );
};
 
export default Navigation;