import React,{useState,useEffect} from 'react';

const { kakao } = window;

// 키워드로 장소검색하고 목록으로 표출하기 : https://apis.map.kakao.com/web/sample/keywordList/
// 카테고리별 장소 검색하기 : https://apis.map.kakao.com/web/sample/categoryFromBounds/
// 리액트로 kakao map api 구현 : https://developer0809.tistory.com/91

const KakaoMap = () => {
    // 검색결과 배열에 담아줌
    const [Places, setPlaces] = useState([]);

    useEffect(() => {
        // 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
        let placeOverlay = new kakao.maps.CustomOverlay({zIndex:1}), 
            contentNode = document.createElement('div'), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다 
            markers = []; // 마커를 담을 배열입니다
        
        // 지도
        // 지도 생성
        const container = document.getElementById('map');
        const mapOption = {
            center: new kakao.maps.LatLng(37.520126, 126.929827),
            level: 5 // 지도의 확대 레벨
        };
        const map = new kakao.maps.Map(container, mapOption);
        // 지도에 idle 이벤트를 등록합니다
        kakao.maps.event.addListener(map, 'idle', searchPlaces);
        
        // 커스텀 오버레이
        // 커스텀 오버레이 컨텐츠를 설정합니다
        placeOverlay.setContent(contentNode);
        // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다 
        contentNode.className = 'placeinfo_wrap';
        // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
        // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다 
        addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
        addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);
        
        // 검색 요청
        // 장소 검색 객체를 생성합니다
        const ps = new kakao.maps.services.Places(map);
        searchPlaces();

        // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
        function addEventHandle(target, type, callback) {
            if (target.addEventListener) {
                target.addEventListener(type, callback);
            } else {
                target.attachEvent('on' + type, callback);
            }
        }

        // 카테고리 검색을 요청하는 함수입니다
        function searchPlaces() {
            // 커스텀 오버레이를 숨깁니다 
            placeOverlay.setMap(null);

            // 지도에 표시되고 있는 마커를 제거합니다
            removeMarker();
            
            // 데이터 조회 api 함수!
            ps.categorySearch('FD6', placesSearchCB, {useMapBounds:true}); 
        }

        // 지도 위에 표시되고 있는 마커를 모두 제거합니다
        function removeMarker() {
            for ( var i = 0; i < markers.length; i++ ) {
                markers[i].setMap(null);
            }   
            markers = [];
        }

        // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {

                // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
                displayPlaces(data);
                
                // 페이지 목록 보여주는 displayPagination() 추가
                displayPagination(pagination);

                // 데이터 set
                setPlaces(data);

            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
                alert('검색 결과가 존재하지 않습니다.');
                return;
            } else if (status === kakao.maps.services.Status.ERROR) {
                // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
                alert('검색 결과 중 오류가 발생했습니다.');
                return;
            }
        }

        // 지도에 마커를 표출하는 함수입니다
        function displayPlaces(places) {

            // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
            // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
            // var order = document.getElementById(currCategory).getAttribute('data-order');

            //?
            //let bounds = new kakao.maps.LatLngBounds();
            for ( var i=0; i<places.length; i++ ) {

                // 마커를 생성하고 지도에 표시합니다
                var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                    marker = addMarker(placePosition, i);
                    //itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

                    
                    // 마커와 검색결과 항목을 클릭 했을 때
                    // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
                    (function(marker, place) {
                        kakao.maps.event.addListener(marker, 'click', function() {
                            displayPlaceInfo(place);
                        });
                    })(marker, places[i]);
            }
            //?
            //map.setBounds(bounds);

        }

        // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
        function addMarker(position, idx, title) {
            var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
            imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
            imgOptions =  {
                spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
            markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                marker = new kakao.maps.Marker({
                position: position, // 마커의 위치
                image: markerImage 
            });
            marker.setMap(map); // 지도 위에 마커를 표출합니다
            markers.push(marker);  // 배열에 생성된 마커를 추가합니다

            return marker;
        }

        // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
        function displayPlaceInfo (place) {
            var content = '<div class="placeinfo">' +
                            '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';   

            if (place.road_address_name) {
                content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
                            '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
            }  else {
                content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
            }                
        
            content += '    <span class="tel">' + place.phone + '</span>' + 
                        '</div>' + 
                        '<div class="after"></div>';

            contentNode.innerHTML = content;
            placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
            placeOverlay.setMap(map);
        }

        // 검색결과 목록 하단에 페이지 번호 표시
        function displayPagination(pagination) {
            var paginationEl = document.getElementById('pagination'),
                fragment = document.createDocumentFragment(),
                i;
    
            // 기존에 추가된 페이지 번호 삭제
            while (paginationEl.hasChildNodes()) {
                paginationEl.removeChild(paginationEl.lastChild);
            }
    
            for (i = 1; i <= pagination.last; i++) {
                var el = document.createElement('a');
                el.href = '#';
                el.innerHTML = i;
        
                if (i === pagination.current) {
                    el.className = 'on';
                } else {
                    // 페이지 이벤트
                    el.onclick = (function (i) {
                        return function () {
                            pagination.gotoPage(i);

                            // 마커 삭제
                            removeMarker();
                        }
                    })(i);
                }
        
                fragment.appendChild(el);
            }
            paginationEl.appendChild(fragment);
        }
        
    }, []);

    return (
        <div>
            <div
                id="map"
                style={{
                width: '100%',
                height: '500px',
                position: 'relative',
                overflow: 'hidden',
                }}
            ></div>
            <div id="menu_wrap" className="bg_white">
                <ul id="placesList">
                    {Places.map((item, i) => (
                    <li className = "item" key={i} style={{ marginTop: '20px' }}>
                        <span className={'markerbg marker_' + (i+1)}></span>
                        <div className="info">
                        <h5>{item.place_name}</h5>
                        {item.road_address_name ? (
                            <div>
                                <span>{item.road_address_name}</span>
                                <span className="jibun gray">{item.address_name}</span>
                            </div>
                        ) : (
                            <span>{item.address_name}</span>
                        )}
                        <span className="tel">{item.phone}</span>
                        </div>
                    </li>
                    ))}
                    <div id="pagination"></div>
                </ul>
            </div>
        </div>
    );
};

export default KakaoMap;