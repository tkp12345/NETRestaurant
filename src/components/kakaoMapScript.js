const { kakao } = window;

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

    // 카테고리로 은행을 검색합니다
    ps.categorySearch(category, placesSearchCB, {useMapBounds:true}); 

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            for (let i=0; i<data.length; i++) {
                displayMarker(data[i]);    
            }       
        }
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {

        // 마커를 생성하고 지도에 표시합니다
        const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x) 
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            console.log(place)
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
        });
    }

}

