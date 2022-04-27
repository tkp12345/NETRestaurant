// import { CurrentLocation, KAKO_DOCUMENT_ID, NET_LOCATION } from "./location";

import { KAKO_DOCUMENT_ID, NET_LOCATION } from "./location";


const { kakao } = window;

// https://apis.map.kakao.com/web/sample/keywordBasic/
export default function kakaoMapApi() {
let currCategory='';

// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
    const placeOverlay  = new kakao.maps.CustomOverlay({zIndex:1}), 
    contentNode = document.createElement('div'), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다 
    markers = []; // 마커를 담을 배열입니다
    // currCategory = ''; 
    // 현재 선택된 카테고리를 가지고 있을 변수입니다;



    const mapContainer  = document.getElementById(KAKO_DOCUMENT_ID);
    console.log('mapContainer',mapContainer )
    const mapOption  = {
        center: new kakao.maps.LatLng(NET_LOCATION.let, NET_LOCATION.lon),
        level: 4
    };

    const map = new kakao.maps.Map(mapContainer , mapOption );
    console.log('kakao',kakao )

    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places(map); 
    console.log('ps',ps)


    // 지도에 idle 이벤트를 등록합니다
    //searchPlaces : 콜백함수 
    kakao.maps.event.addListener(map, 'idle', searchPlaces);


console.log('contentNode:',contentNode)
// 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다 
contentNode.className = 'placeinfo_wrap';

// 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
// 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다 
addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

// 커스텀 오버레이 컨텐츠를 설정합니다
placeOverlay.setContent(contentNode);  

// 각 카테고리에 클릭 이벤트를 등록합니다
addCategoryClickEvent();

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
    console.log('🚩searchPlaces 카테고리 검색을 요청하는 함수:' )
    console.log('currCategory:',currCategory);
    if (!currCategory) {
        console.log('설마 여기입니까 ?')
        return;
    }
    // 커스텀 오버레이를 숨깁니다 
    placeOverlay.setMap(null);
    console.log('  // 커스텀 오버레이를 숨깁니다-placeOverlay :',placeOverlay)


    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    contentNode.log('검색된값:',currCategory)
    ps.categorySearch(currCategory, placesSearchCB, {useMapBounds:true}); 
}


// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    console.log('👦장소 검색 완료')
    if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
        displayPlaces(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요

    } else if (status === kakao.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
        
    }
}


// 지도에 마커를 표출하는 함수입니다
function displayPlaces(places) {
    console.log('🚩addMarker:',addMarker)
    // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
    // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
    var order = document.getElementById(currCategory).getAttribute('data-order');

    

    for ( var i=0; i<places.length; i++ ) {

            // 마커를 생성하고 지도에 표시합니다
            var marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order);

            // 마커와 검색결과 항목을 클릭 했을 때
            // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
            (function(marker, place) {
                console.log('마커클릭')
                kakao.maps.event.addListener(marker, 'click', function() {
                    displayPlaceInfo(place);
                });
            })(marker, places[i]);
    }
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, order) {
    console.log('🚩addMarker:',addMarker)
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(27, 28),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(46, (order*36)), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(11, 28) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage 
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    console.log('👴markers:',markers)
    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}

// 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
function displayPlaceInfo (place) {
    console.log('클릭한 장소정보 호출')
    console.log('place:',place)
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


// 각 카테고리에 클릭 이벤트를 등록합니다
function addCategoryClickEvent() {
    console.log('카테고리 클릭 이벤트 등록 ')
    var category = document.getElementById('category'),
        children = category.children;
        console.log('카테고리:',category)
    for (var i=0; i<children.length; i++) {
        children[i].onclick = onClickCategory;
        console.log('onClickCategory:',onClickCategory)
    }
}

//👨 여기서 문제발생 
//👨  searchPlaces 호출이 안됨
// 카테고리를 클릭했을 때 호출되는 함수입니다
function onClickCategory() {
    console.log('🚩카테고리 클릭-onClickCategory')
    console.log('this:',this);
    var id = this.id,
        className = this.className;
    placeOverlay.setMap(null);

    if (className === 'on') {
        currCategory = '';
        changeCategoryClass();
        removeMarker();
    } else {
        console.log('🚩카테고리 클릭-트리거')
        currCategory = id;
        console.log('currCategory:',currCategory)
        changeCategoryClass(this);
        searchPlaces();
    }
}

// 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
function changeCategoryClass(el) {
    console.log('👴changeCategoryClass')
    var category = document.getElementById('category'),
        children = category.children,
        i;

    for ( i=0; i<children.length; i++ ) {
        children[i].className = '';
    }

    if (el) {
        el.className = 'on';
    } 
} 
}