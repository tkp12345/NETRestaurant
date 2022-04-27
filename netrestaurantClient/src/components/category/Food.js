import React ,{useEffect,useState}from 'react';
import kakaoMapApi from '../../util/kakaoMapApi';
import { CATEGORY, KAKO_DOCUMENT_ID } from '../../util/location';
import MapContainer from './MapContainer';


 // FD6 음식점
// CE7 카페


const Food = () => {

    return (
        <div >
        <MapContainer category={CATEGORY.food}/>
      </div>
  
    );
};

export default Food;