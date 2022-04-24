import React from 'react';
import goodClick from '../img/good_click.png';
import goodNotClick from '../img/good_notClick.png';

const ListItem = (place) => {
    return (
        <li className='item'>
            <div className='info'>
                <h5> { place.place_name } </h5>
                ( { place.road_address_name } ?
                    <span>{ place.road_address_name }</span> : null
                )
                <span className='jibun gray'> { place.address_name } </span>
                <a href = {place.place_url} target='_blank' rel="noreferrer">상세 정보</a>
                <span className='tel'> {place.phone} </span>
            </div>
            <span className='good'>
                ( { place.good } ? <img className='goodImg' src={goodClick}></img> : <img className='goodImg' src={goodNotClick}></img> )            
            </span>
        </li>
    );
};


export default ListItem;