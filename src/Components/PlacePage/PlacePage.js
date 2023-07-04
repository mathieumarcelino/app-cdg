import React from 'react';
import './PlacePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const PlacePage = ({ data }) => {
    let { id } = useParams();
    let place = data[parseInt(id)];
    let navigate = useNavigate();

    const customIcon = new Icon({
        iconUrl: 'https://mathieumarcelino.com/fondationcdg/wp-content/uploads/2023/07/map.png',
        iconSize: [25, 34],
    });

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <div className='page'>
            <div className='back-btn' onClick={handleBackClick}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <div className='page-img'>
                <img src={place.image} alt={place.title} />
            </div>
            <div className='page-content'>
                <h2>{place.title}</h2>
                <p>{place.description}</p>
                <div className='page-content-place'>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <p>{place.city}</p>
                </div>
                <div className='page-map'>
                    <MapContainer center={[place.latitude, place.longitude]} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[place.latitude, place.longitude]} icon={customIcon}/>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default PlacePage;
