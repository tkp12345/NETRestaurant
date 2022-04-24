import React, {useEffect} from 'react';
import "./css/SearchList.css";

const SearchList = () => {

    useEffect(() => {
        
    }, []);
    

    return (
        <div id="menu_wrap" className='bg_white' >  
            <ul id="placesList"></ul>
            <div id="pagination"></div>
        </div>
    );
};

export default SearchList;