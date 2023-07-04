import React from 'react';
import './PlaceCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

const PlaceCard = ({ id, title, description, image, distance, city }) => {

    const navigate = useNavigate();

    return (
        <div className='card' onClick={() => navigate(`/place/${id}`)}>
            <div className='card-img'>
                {distance || distance === 0 ? <div className='distance'>{parseFloat(distance).toFixed(1)} km</div> : ''}
                <img src={image} alt={title} />
            </div>
            <div className='card-content'>
                <div className='card-content-top'>
                    <h2>{title}</h2>
                    <p>{description.slice(0, 150)}...</p>
                </div>
                <div className='card-content-bottom'>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <p>{city}</p>
                </div>
            </div>
        </div>
    );
};

export default PlaceCard;
