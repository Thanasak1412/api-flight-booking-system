import Location from '../models/locationModel';

const _mockLocations = [
  {
    city: 'New York',
    country: 'USA',
    airportCode: 'JFK',
    airportName: 'John F. Kennedy International Airport',
  },
  {
    city: 'Los Angeles',
    country: 'USA',
    airportCode: 'LAX',
    airportName: 'Los Angeles International Airport',
  },
  {
    city: 'San Francisco',
    country: 'USA',
    airportCode: 'SFO',
    airportName: 'San Francisco International Airport',
  },
  {
    city: 'Chicago',
    country: 'USA',
    airportCode: 'ORD',
    airportName: "O'Hare International Airport",
  },
];

Location.insertMany(_mockLocations)
  .then(() => console.log('Mock locations inserted'))
  .catch((error) => console.error('Error inserting mock locations:', error));
