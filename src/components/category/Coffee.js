import React, {useEffect} from 'react';
import KakaoMapScript from '../kakaoMapScript';

const Coffee = () => {
    useEffect(() => {
        KakaoMapScript();
    }, []);

    return (
            <div className='map_wrap'>
			<div
                id='kakaomap'
                style={{
                    width: '1000px',
                    height: '300px',
                }}
            ></div>

            <ul id='category'>
                <li id='CE7' 
                    data-order='4'
                    style={{ 
                    cursor: 'pointer', 
                     }}
                    ><span className='category_bg cafe'></span>
                      조회
                </li>
            </ul>

            <h3> 현재 조회한 목록</h3>
            <hr style={{ border: "2px solid #808080", width: '100%'}} />
            <div
                id='detail'
                style={{
                    width: '800px',
                    height: '100px',
                    position : 'static',
                }}
            ></div>
            
            <h3> 이전에 조회한 목록 </h3>
            <hr style={{ border: "2px solid #808080", width: '100%'}} />
            <div
                id='lastdetail'
                style={{
                    width: '800px',
                    height: '700px',
                    position : 'static',
                }}
            ></div>
        </div>
    );
};

export default Coffee;
