import React, {useState,useEffect} from 'react';
import ListItem from './ListItem';
import "./css/KakaoComponent.css";

const { kakao } = window;

const KakaoComponent = ( props ) => {

    const [loadDataList, setLoadDataList] = useState([]);
        
    useEffect(() => {
        
        const infowindow = new kakao.maps.InfoWindow({zIndex:1});
        // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
        const container = document.getElementById('myMap');
        const options = {
            center: new kakao.maps.LatLng(37.520126, 126.929827),
            level: 3
        };

        let map = new kakao.maps.Map(container, options) ;

        // 장소 검색 객체를 생성합니다
        let ps = new kakao.maps.services.Places(map); 

        let markers = [];
        // 지도에 idle 이벤트를 등록합니다
        kakao.maps.event.addListener(map, 'idle', searchPlaces);

        // 카테고리로 음식점을 검색합니다
        ps.categorySearch(props.category, placesSearchCB, {useMapBounds:true}); 
    
        function onReset(){
            setLoadDataList([]);
        }
    
        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        function placesSearchCB (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                setLoadDataList( displayMarker( data ) );
                displayPagination(pagination);
            }
        }
    
        // 카테고리 검색을 요청하는 함수입니다
        function searchPlaces() {
            onReset();
            ps.categorySearch('FD6', placesSearchCB, {useMapBounds:true}); 
        }
    
        // 지도 위에 표시되고 있는 마커를 모두 제거합니다
        function removeMarker() {
            for ( var i = 0; i < markers.length; i++ ) {
                markers[i].setMap(null);
            }   
            markers = [];
        }
    
        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(places) {
            var bounds = new kakao.maps.LatLngBounds(); 
            
            // 지도에 표시되고 있는 마커를 제거합니다
            removeMarker();
    
             // 마커 생성 
            places.map( ( item, i ) => {
                let placePosition = new kakao.maps.LatLng( item.y, item.x ),
                    marker = addMarker( placePosition );

                kakao.maps.event.addListener(marker, 'mouseover', function() {
                    displayInfowindow(marker, item.place_name);
                });
    
                kakao.maps.event.addListener(marker, 'mouseout', function() {
                    infowindow.close();
                });
    
                item.marker = marker;
                item.infowindow = infowindow;
                item.map = map;
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                bounds.extend(placePosition);
            });
            return places;
        }
    
        // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
        function addMarker( position ) {
            const marker = new kakao.maps.Marker({
                        map: map,
                        position: position
                    });

            marker.setMap(map); // 지도 위에 마커를 표출합니다
            markers.push(marker);  // 배열에 생성된 마커를 추가합니다
            return marker;
        }
    
        // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
        function displayPagination(pagination) {
            var paginationEl = document.getElementById('pagination'),
                fragment = document.createDocumentFragment(),
                i; 
    
            // 기존에 추가된 페이지번호를 삭제합니다
            while (paginationEl.hasChildNodes()) {
                paginationEl.removeChild (paginationEl.lastChild);
            }

            for (i=1; i<=pagination.last; i++) {
                var el = document.createElement('a');
                el.href = "#";
                el.innerHTML = i;
    
                if (i===pagination.current) {
                    el.className = 'on';
                } else {
                    el.onclick = (function(i) {
                        return function() {
                            pagination.gotoPage(i);
                        }
                    })(i);
                }
    
                fragment.appendChild(el);
            }
            paginationEl.appendChild(fragment);
        }
    
        function displayInfowindow(marker, title) {
            var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
        
            infowindow.setContent(content);
            infowindow.open(map, marker);
        }
    },[]);
    
    

    return (
        <div>
            <span>
                <div id='myMap' style={{
                    width: '800px',
                    height: '500px'
                }}></div>
            </span>
            <span>
                <div id="menu_wrap" className='bg_white' >  
                    <ul id="placesList">
                        { loadDataList.map((item,index) => (
                            <ListItem key={index} places={item} ></ListItem> 
                        ))}
                    </ul>
                    <div id="pagination"></div>
                </div>
            </span>
        </div>
        
    );
};


export default KakaoComponent;

