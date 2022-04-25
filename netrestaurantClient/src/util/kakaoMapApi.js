import { CurrentLocation, KAKO_DOCUMENT_ID, NET_LOCATION } from "./location";

const { kakao } = window;

// 공통사용 로직 이기 떄문에 모듈로 뻈습니다

//geoloctionApi
//https://apis.map.kakao.com/web/sample/geolocationMarker/
export function displayMarker(locPosition, message,map,placeOverlay) {

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({  
        map: map, 
        position: locPosition
    }); 
    
    var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content : iwContent,
        removable : iwRemoveable
    });

    
            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function() {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                placeOverlay.setContent('<div style="padding:5px;font-size:12px;">' + locPosition.place_name + '</div>');
                placeOverlay.open(map, marker);
            });
    
    // 인포윈도우를 마커위에 표시합니다 
    infowindow.open(map, marker);
    
    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);      
}   

export function kakaoGeolocationApi(map,placeOverlay){
    
    if (navigator.geolocation) {
    console.log('isNavigator');

        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function(position) {
            
            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            
            var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                message = '<div style="padding:5px;">현재위치</div>'; // 인포윈도우에 표시될 내용입니다
            
            // 마커와 인포윈도우를 표시합니다
            displayMarker(locPosition, message,map,placeOverlay);
                return true 
          });

        
    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        console.log('!isNavigator');

        var locPosition = new kakao.maps.LatLng(NET_LOCATION.let, NET_LOCATION.let.lon),    
            message = 'geolocation을 사용할수 없어요..'
            
        displayMarker(locPosition, message,map,placeOverlay);
        return false;
    }
}


export default function kakaoMapApi(category) {
// 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
    const placeOverlay = new kakao.maps.CustomOverlay({zIndex:1});

    console.log('placeOverlay:',placeOverlay)

    let mapContainer = document.getElementById(KAKO_DOCUMENT_ID), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(NET_LOCATION.let, NET_LOCATION.let.lon), // 지도의 중심좌표
        level: 4 // 지도의 확대 레벨
    };  

    console.log('mapContainer:',mapContainer)

    // 지도를 생성합니다    
    const map = new kakao.maps.Map(mapContainer, mapOption); 

    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places(map); 
    
    console.log('ps:',ps)

    kakaoGeolocationApi(map,placeOverlay)

     // 카테고리로 은행을 검색합니다
     ps.categorySearch(category, placesSearchCB, {useMapBounds:true}); 

       // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            for (let i=0; i<data.length; i++) {
                displayMarker(data[i],map,map,'',placeOverlay);    
            }       
        }
    }

        // // 지도에 마커를 표시하는 함수입니다
        // function displayMarker(place) {

        //     // 마커를 생성하고 지도에 표시합니다
        //     const marker = new kakao.maps.Marker({
        //         map: map,
        //         position: new kakao.maps.LatLng(place.y, place.x) 
        //     });
    
        //     // 마커에 클릭이벤트를 등록합니다
        //     kakao.maps.event.addListener(marker, 'click', function() {
        //         console.log(place)
        //         // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        //         placeOverlay.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        //         placeOverlay.open(map, marker);
        //     });
        // }




}