import './styles/LocationInfo.css'
import React from 'react'

const LocationInfo = ({ location }) => {

    
    return (
        <article className='location'>
            <h2 className='location__header'>{location?.name}</h2>
            <ul className='location__list'>
                <li className='location__item'>
                    <span className='location__label'>Type</span>
                    <span className='location__item-value'>{location?.type}</span></li>
                <li className='location__item'>
                    <span className='location__label'>Dimension</span>
                    <span className='location__item-value'>{location?.dimension}</span></li>
                <li className='location__item'>
                    <span className='location__label'>Population</span>
                    <span className='location__item-value'>{location?.residents.length}</span></li>
            </ul>
        </article>
    )
}

export default LocationInfo