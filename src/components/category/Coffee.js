import React, {useEffect} from 'react';
import KakaoMapScript from '../kakaoMapScript';

const Coffee = () => {

	useEffect(() => {
		KakaoMapScript();
	}, []);

	return (
		
		<div className='map_wrap'>
			<div
				id='myMap'
				style={{
					width: '600px',
					height: '530px',
				}}
			></div>

			<ul id='category'>
				<li id='CE7' data-order='4'>
					<span className='category_bg cafe'></span>
                    조회
				</li>
			</ul>
		</div>
	
	);
};

export default Coffee;