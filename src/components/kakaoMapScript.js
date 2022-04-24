const { kakao } = window;
// import goodClick from '../img/good_click.png';
import goodNotClick from '../img/good_notClick.png';
// https://apis.map.kakao.com/web/sample/keywordBasic/
export default function KakaoMapScript(category) {

    // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
    const infowindow = new kakao.maps.InfoWindow({zIndex:1});

    const container = document.getElementById('myMap');
    const options = {
        center: new kakao.maps.LatLng(37.520126, 126.929827),
        level: 3
    };
    const map = new kakao.maps.Map(container, options);


    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places(map); 

    let markers = [];

    // 지도에 idle 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'idle', searchPlaces);

    // 카테고리로 은행을 검색합니다
    ps.categorySearch(category, placesSearchCB, {useMapBounds:true}); 

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            displayList(data);
            displayPagination(pagination);
        }
    }

    // 카테고리 검색을 요청하는 함수입니다
    function searchPlaces() {
        
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
    function displayList(places) {
        var listEl = document.getElementById('placesList'), 
            // menuEl = document.getElementById('menu_wrap'),
            fragment = document.createDocumentFragment(), 
            bounds = new kakao.maps.LatLngBounds(); 
        
        removeAllChildNods(listEl);
        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        for ( var i=0; i<places.length; i++ ) {
            // TODO : DB 에서 따봉 및 기타 정보 조회 후 설정


            // 마커를 생성하고 지도에 표시합니다
            var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                marker = addMarker( placePosition ),
                itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
            
            
            (function(marker, title) {
                kakao.maps.event.addListener(marker, 'mouseover', function() {
                    displayInfowindow(marker, title);
                });
    
                kakao.maps.event.addListener(marker, 'mouseout', function() {
                    infowindow.close();
                });
    
                itemEl.onmouseover =  function () {
                    displayInfowindow(marker, title);
                };
    
                itemEl.onmouseout =  function () {
                    infowindow.close();
                };
            })(marker, places[i].place_name);

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(placePosition);
            fragment.appendChild(itemEl);
        }
    
        // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
        listEl.appendChild(fragment);
        // menuEl.scrollTop = 0;
    
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        // map.setBounds(bounds);
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

    // 검색결과 항목을 Element로 반환하는 함수입니다
    // TODO : 리액트 문법으로 변경 가능하지 않을까?
    function getListItem(index, place) {
        console.log(place);
        var el = document.createElement('li'),
        itemStr = '<div class="info">' +
                  '   <h5>' + place.place_name + '</h5>';

        if (place.road_address_name) {
            itemStr += '    <span>' + place.road_address_name + '</span>' +
                        '   <span class="jibun gray">' +  place.address_name  + '</span>';
        } else {
            itemStr += '    <span>' +  place.address_name  + '</span>'; 
        }
        
        // TODO : 상세 보기 클릭을 a 태그가 아닌 모달 창으로 변경하자 
        itemStr += '    <a href="' + place.place_url + '" target="_blank" >상세 정보</a>';

        itemStr += '  <span class="tel">' + place.phone  + '</span>' +
                    '</div>';           

        // TODO : 좋아요!
        itemStr += '<img src='+goodNotClick+' class = "goodImg" ></img>'

        itemStr += '</span>';
        
        el.innerHTML = itemStr;
        el.className = 'item';

        return el;
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

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {   
        while (el.hasChildNodes()) {
            el.removeChild (el.lastChild);
        }
    }

    function displayInfowindow(marker, title) {
        var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
    
        infowindow.setContent(content);
        infowindow.open(map, marker);
    }
}

