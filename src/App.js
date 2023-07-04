import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getDistanceFromLatLonInKm } from './utils';
import PlaceCard from './Components/PlaceCard/PlaceCard';
import PlacePage from './Components/PlacePage/PlacePage'; // import your new component
import he from 'he';

function App() {
  const [data, setData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
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

    navigator.geolocation.getCurrentPosition(position => {
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (userLocation !== null) {
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
    <Router>
      <Routes>
        <Route path="/" element={
          <div className='list'>
            {data.map((item, index) => (
              <PlaceCard id={index} title={item.title} description={item.description} image={item.image} distance={item.distance} city={item.city} />
            ))}
          </div>
        } />
        <Route path="/place/:id" element={<PlacePage data={data} />} />
      </Routes>
    </Router>
  );
}

export default App;
