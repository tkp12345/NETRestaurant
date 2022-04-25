import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import {restaurantList} from '../foodTestData';
import KakaoMapScript from '../kakaoMap/kakaoMap'


// https://darrengwon.tistory.com/275
// https://ddeck.tistory.com/29?category=866566

const Food = () => {
    // 식당 목록
     const [aRestaurant, setARestaurant] = useState([{
        restaurantId : '',
        restaurantName: '',
        restaurantAddress: '',
        restaurantScore: ''
    }]);
    // 글 리스트의 갯수를 세기 위해 선언, 기본값 0
    const [rankIdx, setRankIdx] = useState(0);
/*
    // await 를 사용하기 위해 async선언
    useEffect(() => {
        try{    
            const getRestaurantList = async () => {
                // 데이터를 받아오는 동안 시간이 소요됨으로 await 로 대기
                const res = await axios.get('/api/test')
                // 받아온 데이터로 다음 작업을 진행하기 위해 await 로 대기
                // 받아온 데이터를 map 해주어 rowData 별로 _aRestaurantInfo 선언
                const _aRestaurant = await res.data.map((rowData) => (
                    // rowData의 갯수만큼 증가
                    setRankIdx(rankIdx+1),
                    {
                        restaurantId: rowData.restaurantId,
                        restaurantName: rowData.restaurantName,
                        restaurantAddress: rowData.restaurantAddress,
                        restaurantScore: rowData.restaurantScore
                    })
                )
                // 선언된 _aRestaurant 를 최초 선언한 aRestaurant 에 concat 으로 추가
                setARestaurant(aRestaurant.concat(_aRestaurant));
            }
        } catch(e){
            console.error(e.message)
        }
    },[]); */

///////////////////////api 연결 전 테스트용//////////////////////////////////////


    useEffect( () => {
        try{
            const getRestaurantList = async () => {
                const _aRestaurant = await restaurantList.map((rowData) => (
                    {
                        restaurantId: rowData.restaurantId,
                        restaurantName: rowData.restaurantName,
                        restaurantAddress: rowData.restaurantAddress,
                        restaurantScore: rowData.restaurantScore
                    })
                );
                setARestaurant(aRestaurant.concat(_aRestaurant)) ;
            }
            getRestaurantList();
        } catch(e) {
            console.error(e.message);
        }
    }, []);
    // console.log(rankIdx);
    // // 선언된 _aRestaurant 를 최초 선언한 aRestaurant 에 concat 으로 추가
    

    console.log(aRestaurant);
//////////////////////////////////////////////////////////////////////////

    return (
        <div >
            <h2>식당 목록</h2>
            <_div_list>

                {/* rowData 가 없으면 '작성된 글이 없습니다'를 나타냄 */}
                {
                    aRestaurant ? aRestaurant.map((rowData,idx) => (
                                        // 최초 선언한 기본값은 나타내지 않음
                                        rowData.restaurantId !== '' &&
                                        <_div_info key={idx}>
                                            {/* 이동 시 id값을 param 으로 전달 */}
                                            <Link key={idx+rowData.restaurantName} to={`/getRestaurantContent/${rowData.restaurantId}`}>{rowData.restaurantName}</Link>
                                            <br/>
                                            <Link key={idx+rowData.restaurantAddress} to={`/getRestaurantContent/${rowData.restaurantId}`}>{rowData.restaurantAddress}</Link>
                                        </_div_info>
                                    )) : <_div_info>
                                            작성된 글이 없습니다. 
                                        </_div_info> 
                }

            </_div_list>
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