import React from 'react';
import KakaoMap from '../map/pharmacy/MapContainer_pharmacy'


// export const searchDataList = [];
// 키워드로 장소검색하고 목록으로 표출하기 : //https://apis.map.kakao.com/web/sample/keywordList/
//카테고리별 장소 검색하기 : https://apis.map.kakao.com/web/sample/categoryFromBounds/
// React Component : https://yuna-library.tistory.com/9
// https://poiemaweb.com/nodejs-mysql
const Pharmacy = () => {
    return (
        <div>
            <KakaoMap/>
        </div>
    );
};

export default Pharmacy;