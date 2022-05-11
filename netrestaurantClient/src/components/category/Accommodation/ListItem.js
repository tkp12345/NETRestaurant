import React, {useState, useEffect} from 'react';
import goodClick from '../../../img/good_click.png';
import goodNotClick from '../../../img/good_notClick.png'
import Axios from 'axios';

const ListItem = ( props ) => {
    const [hover, setHover] = useState(false);
    const [isGoodClick, setIsGoodClick] = useState(props.places.isGood);
    console.log(props);
    const place = props.places,
        infowindow = place.infowindow,
        map = place.map,
        marker = place.marker;
    useEffect(() => {
        if( hover ){
            displayInfowindow(marker, place.place_name );
        } else {
            infowindow.close();
        }
    }, [hover]);


    useEffect(() => {
        // TODO : DB 저장
        if( isGoodClick ){
            Axios.post('http://localhost:8080/accommodation/setGood',{
                mapId : props.places.id,
                userId : 'test' 
            }).then( (res) => {
            
            });

        } else {
            Axios.post('http://localhost:8080/accommodation/delGood',{
                mapId : props.places.id,
                userId : 'test' 
            }).then( (res) => {
            
            });
        }
    }, [isGoodClick]);


    function displayInfowindow( marker, title ) {
        var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
        
        infowindow.setContent(content);
        infowindow.open(map, marker);
    }
    
    const good = isGoodClick ? <img className='goodImg' src= {goodClick} ></img> : <img className='goodImg' src={goodNotClick}></img> ;
    const road_address_name = place.road_address_name ? <span>{ place.road_address_name }</span> : null;

    return (
        <li className='item'>
            <div>
                <span className='info'  
                    onMouseOver = { () => { setHover( true ) } } 
                    onMouseOut = { () => { setHover( false ) } } >
                    <h5> { place.place_name } </h5>
                    {road_address_name}
                    <span className='jibun gray'> { place.address_name } </span>
                    <a href = {place.place_url} target='_blank' rel="noreferrer">상세 정보</a>
                    <span className='tel'> {place.phone} </span>
                </span>
                <span className='good' onClick={()=>{ setIsGoodClick( !isGoodClick );  }}>
                    {good}          
                </span> 
            </div>
            
        </li>
    );
};

export default ListItem;