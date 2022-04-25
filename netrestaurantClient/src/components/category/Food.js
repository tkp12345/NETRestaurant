import React ,{useEffect}from 'react';
import kakaoMapApi from '../../util/kakaoMapApi';
import { KAKO_DOCUMENT_ID } from '../../util/location';

const { kakao } = window;


 // FD6 음식점
// CE7 카페


const Food = () => {

    useEffect(() => {
        kakaoMapApi('FD6');
    }, []);

    return (
        <div id={KAKO_DOCUMENT_ID} style={{
            width: '800px',
            height: '700px'
        }}></div>
    );
};

export default Food;