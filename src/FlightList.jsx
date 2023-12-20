import {React, useState} from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions,Card,CardMedia,Button, Box, useTheme,
useMediaQuery, LinearProgress, styled } from '@mui/material';
import { DataGrid, GridToolbar} from '@mui/x-data-grid';
import axios from 'axios';
import FlightCard from './FlightCard.jsx';
import FlightButtons from './FlightButtons.jsx';
 
const FlightList = ({ flights, onDelete, onUpdate }) => {
  // Asegúrate de que flights.resources siempre sea una matriz
  const rows = flights.resources || [];
  const [loading, setLoading]= useState(false)
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [img, setImg]=useState(null);
  const isSmallScreen = useMediaQuery('(max-width:599.95px)');  // xs
  const isMediumScreen = useMediaQuery('(min-width:600px) and (max-width:899.95px)');  // sm
  // const isLargeScreen = useMediaQuery('(min-width:900px) and (max-width:1199.95px)');  // md
  // const isExtraLargeScreen = useMediaQuery('(min-width:1200px)');  // lg and xl
  const isPortraitMode = useMediaQuery('(orientation: portrait)');
  
 
 
 
  const handleDelete = async (flightId) => {
    // Perform the delete operation, then call onUpdate to update the flight list
    await onDelete(flightId);
    onUpdate();
  };
  const fetchImage = async (flightId) => {
    try {
      const response = await axios.get(`http://localhost:8000/flights/${flightId}/photo`, {
        responseType: 'arraybuffer'});
 
        if (response.status === 200) {
          const imageBlob = new Blob([response.data], { type: response.headers['content-type'] });
          const imageUrl = URL.createObjectURL(imageBlob);
          setImg(imageUrl);
        } else if(response.status === 404){
          setImg('No Image');
        }
    } catch (error) {
      console.error('Error fetching image', error);
    } finally {
      setLoading(false);
    }
  };
 
  const handleClickImg =(open,row)=>{
    row.row?fetchImage(row.row.id):fetchImage(row.id)
    setImagePreviewOpen(open)
  }
 
  const renderAccionesButton = (row) => {
    return <FlightButtons flight={row} onDelete={handleDelete} onClickImage={handleClickImg} />;
  };
  
  const columns = [
    { field: 'code', headerName: 'Code', flex:1.25 },
    { field: 'capacity', headerName: 'Capacity',flex:1.25 },
    { field: 'departureDate', headerName: 'Departure Date', flex:1.25 },
    { field: 'actions',headerName:'Actions',renderCell:renderAccionesButton,flex:0.45}
  ];
 
 
  const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
      fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
      fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
      fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
      fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
      fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
      fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
  }));
  const CustomNoRowsOverlay=()=>{
    if(loading) return(<strong> <LinearProgress /></strong>)
    else {
      return (
        <StyledGridOverlay>
          <svg
            width="120"
            height="100"
            viewBox="0 0 184 152"
            aria-hidden
            focusable="false"
          >
            <g fill="none" fillRule="evenodd">
              <g transform="translate(24 31.67)">
                <ellipse
                  className="ant-empty-img-5"
                  cx="67.797"
                  cy="106.89"
                  rx="67.797"
                  ry="12.668"
                />
                <path
                  className="ant-empty-img-1"
                  d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                />
                <path
                  className="ant-empty-img-2"
                  d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                />
                <path
                  className="ant-empty-img-3"
                  d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                />
              </g>
              <path
                className="ant-empty-img-3"
                d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
              />
              <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
              </g>
            </g>
          </svg>
          <Box sx={{ mt: 1 }}>No Data</Box>
        </StyledGridOverlay>
      )
    }
  }
  
  return (
    <div style={{ height: 'auto', width: '100%', overflow:'auto' }}>
      {isSmallScreen ? (
      // Mostrar cards en pantallas pequeñas
      rows.map((flight) => <FlightCard key={flight.id} flight={flight} onDelete={handleDelete} onClickImage={handleClickImg} />)
    ) : isMediumScreen ? (
      isPortraitMode ? (
        // Mostrar cards en modo retrato en pantallas medianas
        rows.map((flight) => <FlightCard key={flight.id} flight={flight} onDelete={handleDelete} onClickImage={handleClickImg} />)
      ) : (
        // Mostrar tabla en modo paisaje en pantallas medianas
        <DataGrid
          autoHeight={true}
          rows={rows}
          columns={columns}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          disableColumnMenu
          hideFooter 
          pageSize={10}
          rowsPerPageOptions={[10]}
          columnVisibilityModel={{id:false}}
          hideFooterSelectedRowCount={true}
          components={{ Toolbar: GridToolbar , NoRowsOverlay:CustomNoRowsOverlay}}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
              printOptions: { disableToolbarButton: true },
              csvOptions:{disableToolbarButton: true}
              
            },
          }}
          sx={{border:0}}
        />
      )
    ) : (
      // Mostrar solo tablas en pantallas grandes
        <DataGrid
          autoHeight={true}
          rows={rows}
          columns={columns}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          disableColumnMenu
          hideFooter 
          pageSize={10}
          rowsPerPageOptions={[10]}
          columnVisibilityModel={{id:false}}
          hideFooterSelectedRowCount={true}
          components={{ Toolbar: GridToolbar , NoRowsOverlay:CustomNoRowsOverlay}}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
              printOptions: { disableToolbarButton: true },
              csvOptions:{disableToolbarButton: true}
              
            },
          }}
          sx={{border:0}}
        />
    )}
      
    <Dialog open={imagePreviewOpen} onClose={() => setImagePreviewOpen(false)}>
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          {img && (
            <Card>
              <CardMedia component="img" height="400" image={img} alt="Flight Preview" />
            </Card>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImagePreviewOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
  </div>
  );
};
 
export default FlightList;