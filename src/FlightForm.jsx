// src/components/FlightForm.js
import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Input, Card, CardMedia, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
 
const FlightForm = ({ open, onClose, onSubmit, onUpdate }) => {
  const [code, setCode] = useState('');
  const [capacity, setCapacity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [errors, setErrors] = useState({});
 
  const validateForm = () => {
    const newErrors = {};

    // Validación para el campo 'code'
    if (!code.match(/^[a-zA-Z]{6}$/)) {
      newErrors.code = 'Code must be 6 characters long and contain only letters.';
    }

    // Validación para el campo 'capacity'
    const capacityNumber = Number(capacity);
    if (isNaN(capacityNumber) || capacityNumber < 1 || capacityNumber > 200) {
      newErrors.capacity = 'Capacity must be a number between 1 and 200.';
    }

    // Validación para el campo 'departureDate'
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!departureDate.match(dateRegex)) {
      newErrors.departureDate = 'Invalid date format. Please use the format YYYY-MM-DD.';
    }

    setErrors(newErrors);

    // Devuelve verdadero si no hay errores
    return Object.keys(newErrors).length === 0;
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
 
    if (file && file.type.startsWith('image/')) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, photo: 'Please select a valid image file.' });
        return;
      }
      setPhoto(file);
      setErrors({ ...errors, photo: null });
    } else {
      setPhoto(null);
      setErrors({ ...errors, photo: 'Please select a valid image file.' });
    }
  };
 
  const handleSubmit = async () => {
    if (!validateForm()) {
      console.log('Form is invalid. Please correct errors.');
      return;
    }
    setLoading(true);
    let response=null;
 
    try {
      if (photo) {
        // If a photo is selected, use FormData for the withPhoto endpoint
        const formData = new FormData();
        formData.append('code', code);
        formData.append('capacity', capacity);
        formData.append('departureDate', departureDate);
        formData.append('photo', photo);
 
        response = await axios.post('http://localhost:8000/flights/withPhoto', formData);
      } else {
        // If no photo, send a JSON payload to the regular endpoint
        //headers: {'Content-Type': 'application/json; charset=utf-8','Access-Control-Allow-Origin':'*' },
        response = await axios.post('http://localhost:8000/flights' , {
          "code":code,
          "capacity":Number(capacity),
          "departureDate":departureDate,
        });
      }
 
      // Call the onSubmit function with the response data
      onSubmit();
      onUpdate();
 
      // Clear the form fields and reset the photo state
      setCode('');
      setCapacity('');
      setDepartureDate('');
      setPhoto(null);
      onClose();
    } catch (error) {
      console.log(error)
      //console.error('Error creating flight:', error)
      if(error.response) {
        if (error.response.data.message === 'Code is already in use' || error.response.data.code === 106) {
          setErrors({ ...errors, code: 'Code is already in use. Please choose a different one.' });
          return;
        } else {
          setErrors({ ...errors, general: 'An error has ocurred. Please try again.' });
          return;}}
    } finally {
      setLoading(false);
      
    }
  };  
 
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Flight</DialogTitle>
      <DialogContent >
        <TextField
          label="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          fullWidth
          sx={{ marginBottom: '10px', marginTop: '5px'}}
          error={!!errors.code}
          helperText={errors.code}
        />
        <TextField
          label="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          fullWidth
          sx={{ marginBottom: '10px'}}
          error={!!errors.capacity}
          helperText={errors.capacity}
        />
        <TextField
          label="Departure Date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          fullWidth
          sx={{ marginBottom: '10px'}}
          error={!!errors.departureDate}
          helperText={errors.departureDate}
        />
        <Input type="file" accept="image/jpeg, image/png, image/gif" onChange={handleFileChange} sx={{ marginBottom: '10px'}} />
        {photo && (
          <Card style={{ marginTop: '16px' }}>
            <CardMedia component="img" height="auto" image={URL.createObjectURL(photo)} alt="Flight Preview" />
          </Card>
        )}
        {errors.photo && (
          <Typography variant="caption" color="error" sx={{ marginTop: '10px' }}>
            {errors.photo}
          </Typography>
        )}
        {errors.general && (
          <Typography  color="error" sx={{ marginTop: '10px' }}>
            {errors.general}
          </Typography>
        )}
        {loading && <CircularProgress style={{ marginTop: '16px' }} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
 
export default FlightForm;
 