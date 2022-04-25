import React, {useState, useEffect} from 'react';
import goodClick from '../../../img/good_click.png';
import goodNotClick from '../../../img/good_notClick.png'

const ListItem = ( place, infowindow, map, marker  ) => {
    // const [hover, setHover] = useState(false);

    // useEffect(() => {
    //     if( hover ){
    //         displayInfowindow(marker, place.place_name );
    //     } else {
    //         infowindow.close();
    //     }
    // }, [hover]);
    
    // function onMouseOver(){
    //     setHover( true );
    // }

    // function onMouseOut(){
    //     setHover( false );
    // }

    // function displayInfowindow( marker, title ) {
    //     var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
        
    //     infowindow.setContent(content);
    //     infowindow.open(map, marker);
    // }
    
    const good = place.good ? <img className='goodImg' src= {goodClick} ></img> : <img className='goodImg' src={goodNotClick}></img> ;
    const road_address_name = place.road_address_name ? <span>{ place.road_address_name }</span> : null;

    return (
        <li className='item' key={place.id} 
            // onMouseOver = { () => { setHover( true ) } } 
            // onMouseOut = { () => { setHover( false ) } } 
        >
            <div>
                <span className='info' >
                    <h5> { place.place_name } </h5>
                    {road_address_name}
                    <span className='jibun gray'> { place.address_name } </span>
                    <a href = {place.place_url} target='_blank' rel="noreferrer">상세 정보</a>
                    <span className='tel'> {place.phone} </span>
                </span>
                <span className='good'>
                    {good}          
                </span> 
            </div>
            
        </li>
    );
};

export default ListItem;