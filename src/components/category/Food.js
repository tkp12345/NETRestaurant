import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import {restaurantList} from '../foodTestData';
import KakaoMapScript, { searchDataList } from '../kakaoMap/kakaoMap';
import '../kakaoMap/kakaoMap.css';


const { kakao } = window;



const Food = () => {

    // MT1 대형마트
    // CS2 편의점
    // PS3 어린이집, 유치원
    // SC4 학교
    // AC5 학원
    // PK6 주차장
    // OL7 주유소, 충전소
    // SW8 지하철역
    // BK9 은행
    // CT1 문화시설
    // AG2 중개업소
    // PO3 공공기관
    // AT4 관광명소
    // AD5 숙박
    // FD6 음식점
    // CE7 카페
    // HP8 병원
    // PM9 약국

    useEffect(() => {
        KakaoMapScript('CE7');
    }, []);

    

    return (
        <div>
            <p style={{
                marginTop:'-12px'}}>
                <em className="link">
                    <a href="/web/documentation/#CategoryCode" target="_blank">카테고리 코드목록을 보시려면 여기를 클릭하세요!</a>
                </em>
            </p>
            <div className="map_wrap">
                <div id="map" style={{
                    width:'100%',
                    height:'100%',
                    position:'relative',
                    overflow:'hidden'
                }}></div>
                <ul id="category">
                    <li id="FD6" data-order="0"> 
                        <span className="category_bg bank"></span>
                        음식점
                    </li>       
                    {/* <li id="MT1" data-order="1"> 
                        <span className="category_bg mart"></span>
                        마트
                    </li>  
                    <li id="PM9" data-order="2"> 
                        <span className="category_bg pharmacy"></span>
                        약국
                    </li>  
                    <li id="OL7" data-order="3"> 
                        <span className="category_bg oil"></span>
                        주유소
                    </li>  
                    <li id="CE7" data-order="4"> 
                        <span className="category_bg cafe"></span>
                        카페
                    </li>  
                    <li id="CS2" data-order="5"> 
                        <span className="category_bg store"></span>
                        편의점
                    </li>
                    <li id="FD6" data-order="6"> 
                        <span className="category_bg store"></span>
                        음식점
                    </li> */}
                </ul>
            </div> 
        </div>
    );
};

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