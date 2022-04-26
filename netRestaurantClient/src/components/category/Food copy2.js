import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
// import {restaurantList} from '../foodTestData';
import KakaoMapScript/* , {searchDataList} */ from '../kakaoMap/kakaoMapCopy';
import '../kakaoMap/kakaoMap.css';


const { kakao } = window;

// export const searchDataList = [];
// 키워드로 장소검색하고 목록으로 표출하기 : //https://apis.map.kakao.com/web/sample/keywordList/
//카테고리별 장소 검색하기 : https://apis.map.kakao.com/web/sample/categoryFromBounds/
// React Component : https://yuna-library.tistory.com/9

const Food = () => {
    //  const [restaurantLIst, setRestaurantLIst] = useState([{
    //     restaurantId : '',
    //     restaurantName: '',
    //     restaurantAddress: '',
    //     restaurantScore: ''
    // }]);
    // const [restaurantList, setRestaurantList] = useState([]);


    useEffect(() => {
        // 음식점 조회하여 지도에 마커 표출합니다.
        KakaoMapScript('FD6');
    }, []);

    return (
        <div>
            <div className="map_wrap">
                <div id="map" style={{
                    width:'100%',
                    height:'100%',
                    position:'relative',
                    overflow:'hidden'
                }}></div>
            </div>
            <div id="menu_wrap" className="bg_white">
                <div className="option">
                    <div>
                        {/* <form onsubmit="searchPlaces(); return false;">
                            키워드 : <input type="text" value="이태원 맛집" id="keyword" size="15"> 
                            <button type="submit">검색하기</button> 
                        </form> */}
                    </div>
                </div>
                <ul id="placesList"></ul>
                <div id="pagination"></div>
            </div>
            <h2>식당 목록</h2>
            {/* <Test /> */}
        </div>
    );
};


const _div_list = styled.div`
padding :10px;
display: flex;
display:block;
margin-top: 100px;
justify-content: center;
align-items: center;
`;
const _div_info = styled.div`
padding :10px;
display: flex;
margin-top: 10px;
border-top: 1px solid #dbdbdb;
font-size : 100%
 `;
export default Food;













// // https://darrengwon.tistory.com/275
// // https://ddeck.tistory.com/29?category=866566

// const Food = () => {
//     // 식당 목록
//      const [aRestaurant, setARestaurant] = useState([{
//         restaurantId : '',
//         restaurantName: '',
//         restaurantAddress: '',
//         restaurantScore: ''
//     }]);
//     // 글 리스트의 갯수를 세기 위해 선언, 기본값 0
//     const [rankIdx, setRankIdx] = useState(0);
// /*
//     // await 를 사용하기 위해 async선언
//     useEffect(() => {
//         try{    
//             const getRestaurantList = async () => {
//                 // 데이터를 받아오는 동안 시간이 소요됨으로 await 로 대기
//                 const res = await axios.get('/api/test')
//                 // 받아온 데이터로 다음 작업을 진행하기 위해 await 로 대기
//                 // 받아온 데이터를 map 해주어 rowData 별로 _aRestaurantInfo 선언
//                 const _aRestaurant = await res.data.map((rowData) => (
//                     // rowData의 갯수만큼 증가
//                     setRankIdx(rankIdx+1),
//                     {
//                         restaurantId: rowData.restaurantId,
//                         restaurantName: rowData.restaurantName,
//                         restaurantAddress: rowData.restaurantAddress,
//                         restaurantScore: rowData.restaurantScore
//                     })
//                 )
//                 // 선언된 _aRestaurant 를 최초 선언한 aRestaurant 에 concat 으로 추가
//                 setARestaurant(aRestaurant.concat(_aRestaurant));
//             }
//         } catch(e){
//             console.error(e.message)
//         }
//     },[]); */

// ///////////////////////api 연결 전 테스트용//////////////////////////////////////


//     useEffect( () => {
//         try{
//             const getRestaurantList = async () => {
//                 const _aRestaurant = await restaurantList.map((rowData) => (
//                     {
//                         restaurantId: rowData.restaurantId,
//                         restaurantName: rowData.restaurantName,
//                         restaurantAddress: rowData.restaurantAddress,
//                         restaurantScore: rowData.restaurantScore
//                     })
//                 );
//                 setARestaurant(aRestaurant.concat(_aRestaurant)) ;
//             }
//             getRestaurantList();
//         } catch(e) {
//             console.error(e.message);
//         }
//     }, []);
//     // console.log(rankIdx);
//     // // 선언된 _aRestaurant 를 최초 선언한 aRestaurant 에 concat 으로 추가
    

//     console.log(aRestaurant);
// //////////////////////////////////////////////////////////////////////////

//     return (
//         <div >
//             <h2>식당 목록</h2>
//             <_div_list>

//                 {/* rowData 가 없으면 '작성된 글이 없습니다'를 나타냄 */}
//                 {
//                     aRestaurant ? aRestaurant.map((rowData,idx) => (
//                                         // 최초 선언한 기본값은 나타내지 않음
//                                         rowData.restaurantId !== '' &&
//                                         <_div_info key={idx}>
//                                             {/* 이동 시 id값을 param 으로 전달 */}
//                                             <Link key={idx+rowData.restaurantName} to={`/getRestaurantContent/${rowData.restaurantId}`}>{rowData.restaurantName}</Link>
//                                             <br/>
//                                             <Link key={idx+rowData.restaurantAddress} to={`/getRestaurantContent/${rowData.restaurantId}`}>{rowData.restaurantAddress}</Link>
//                                         </_div_info>
//                                     )) : <_div_info>
//                                             작성된 글이 없습니다.
//                                         </_div_info> 
//                 }

//             </_div_list>
//       </div>
//     );
// };

// const _div_list = styled.div`
// padding :10px;
// display: flex;
// display:block;
// margin-top: 100px;
// justify-content: center;
// align-items: center;
// `;
// const _div_info = styled.div`
// padding :10px;
// display: flex;
// margin-top: 10px;
// border-top: 1px solid #dbdbdb;
// font-size : 100%
//  `;

//  export default Food;