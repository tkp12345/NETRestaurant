import React ,{useEffect,useState}from 'react';
import kakaoMapApi from '../../util/kakaoMapApi';
import { CATEGORY, KAKO_DOCUMENT_ID } from '../../util/location';
import MapContainer from '../map/MapContainer';




const Food = () => {

    return (
        <div >
        <MapContainer category={CATEGORY.FOOD}/>
      </div>
  
    );
};

export default Food;