import React, { useState, useEffect } from 'react';
import { getDistanceFromLatLonInKm } from './utils';
import PlaceCard from './Components/PlaceCard/PlaceCard';
import he from 'he';

function App() {
  const [data, setData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Fetch data from API
    fetch('https://mathieumarcelino.com/fondationcdg/wp-json/wp/v2/posts?categories=6')
      .then(response => response.json())
      .then(fetchedData => {
        setData(fetchedData.map(item => ({
          title: he.decode(item.title.rendered).replace(/<[^>]*>?/gm, ''),
          description: he.decode(item.content.rendered).replace(/<[^>]*>?/gm, ''),
          image: item.featured_image_url,
          city: item.meta_fields.ville[0],
          latitude: item.meta_fields.latitude[0],
          longitude: item.meta_fields.longitude[0],
        })));
      });

    // Get user location
    navigator.geolocation.getCurrentPosition(position => {
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (userLocation !== null) {
      // Calculate distances and sort
      setData(currentData =>
        currentData.map(item => ({
          ...item,
          distance: getDistanceFromLatLonInKm(
            userLocation.latitude,
            userLocation.longitude,
            item.latitude,
            item.longitude
          ),
        })).sort((a, b) => a.distance - b.distance)
      );
    }
  }, [userLocation]);
  return (
    <div className='list'>
      {data.map((item, index) => (
        <PlaceCard title={item.title} description={item.description} image={item.image} distance={item.distance} city={item.city}>
        </PlaceCard>
      ))}
    </div>
  );
}

export default App;
