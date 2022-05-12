import React, {useEffect, useState} from 'react';
import MapContainer from "../map/MapContainer";
import {CATEGORY} from "../../util/location";

const ConvenienceStore = () => {
    const [DB,setDB]=useState([]);

useEffect(()=>{
    console.log('DB:',DB)
},[DB])
    return (
        <div>
            <MapContainer DB={DB} setDB={setDB} category={CATEGORY.CONVEN}/>
        </div>
    );
};

export default ConvenienceStore;