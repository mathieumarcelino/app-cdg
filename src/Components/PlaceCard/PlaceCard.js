import React from 'react';
import './PlaceCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

const PlaceCard = ({ title, description, image, distance, city }) => {
    return (
        <div className='card'>
            <div className='card-img'>
                {distance || distance === 0 ? <div className='distance'>{parseFloat(distance).toFixed(1)} km</div> : <div className='distance'>? km</div>}
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
