import React from 'react';
import { render } from '@testing-library/react';
import FlightList from './FlightList';

// Mock data for testing
const mockedFlights = [
  { id: 1, code: 'ABC123', capacity: 200, departureDate: '2023-12-31' },
  // Add more mocked flights as needed
];

test('renders FlightList with mocked data', () => {
  // Mock the onDelete and onUpdate functions
  const mockOnDelete = jest.fn();
  const mockOnUpdate = jest.fn();

  // Render the FlightList component with mocked data and functions
  const { getByText } = render(
    <FlightList flights={{ resources: mockedFlights }} onDelete={mockOnDelete} onUpdate={mockOnUpdate} />
  );

  // Check if the component renders the mocked data
  expect(getByText('ABC123')).toBeInTheDocument();
  expect(getByText('200')).toBeInTheDocument();
  expect(getByText('2023-12-31')).toBeInTheDocument();


  // Ensure that the onDelete and onUpdate functions are not called during rendering
  expect(mockOnDelete).not.toHaveBeenCalled();
  expect(mockOnUpdate).not.toHaveBeenCalled();
});
