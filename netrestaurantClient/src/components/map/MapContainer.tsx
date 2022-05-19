import React, {ReactHTMLElement, useCallback, useEffect, useState} from 'react'
import {CATEGORY, NET_LOCATION} from '../../util/location'
import styled from "styled-components";

const Container = styled.div`
	display:flex;
	flex-direction:column;
`;
const Contents = styled.div`
	display:flex;
`;

const MapSection = styled.div`
	width:70vw;
	height:600px;
	position:relatice;
	overflow:hidden;
	border-radius:6px;
	box-shadow: 0 25px 45px rgb(0 0 0 / 10%);

`;
const RightListSection = styled.div`
margin-left:10px;
	width:25vw;
	height:600px;
font-size:18px;
	padding:20px;
	background:#ffffffb3;
	border-radius:6px;
	box-shadow: 0 25px 45px rgb(0 0 0 / 10%);
	overflow:scroll;

`;
const LeftListSection = styled.div`
	width:70vw;
	height:400px;
font-size:18px;
	padding:20px;
	background:#ffffffb3;
	margin-top :10px;
	border-radius:6px;
	box-shadow: 0 25px 45px rgb(0 0 0 / 10%);
	overflow:scroll;

`;
const MainTitle = styled.div`
margin-bottom:15px;
font: small-caps bold 24px/1 sans-serif;
font-size: 2.vw;
color: rgb(211 174 219);
text-shadow: -1px 0 #ffffff, 0 1px black, 1px 0 #ffffff, 0 -1px #ffffff;
`;


declare global {
  interface Window {
      kakao: any;
  }
}

interface place {
  id: string,	// 장소 ID
  place_name:	string,	// 장소명, 업체명
  category_name: 	string,	// 카테고리 이름
  category_group_code:	string,	// 중요 카테고리만 그룹핑한 카테고리 그룹 코드
  category_group_name:	string,	// 중요 카테고리만 그룹핑한 카테고리 그룹명
  phone:	string,	// 전화번호
  address_name:	string,	// 전체 지번 주소
  road_address_name:	string,	// 전체 도로명 주소
  x:	string,	// X 좌표 혹은 경도(longitude)
  y:	string,	// Y 좌표 혹은 위도(latitude)
  place_url:	string,	// 장소 상세 페이지 URL
  distance:	string,	// 중심좌표까지의 거리 (단, x,y 파라미터를 준 경우에만 존재)
  like? : number
}

const { kakao } = window


const MapContainer = ( category: string, setDB: Function, DB: Array<place> ) => {

  const [placeList ,setPlaceList]=useState<place[]>([]);

  const onclickLike = useCallback((place:place)=>{
      const data = JSON.parse(localStorage.getItem('DB')!)

      localStorage.setItem('DB', JSON.stringify(data))
  },[])

    useEffect(() => {
    var placeOverlay = new kakao.maps.CustomOverlay({zIndex:1}), 
    contentNode: HTMLDivElement = document.createElement('div'), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다 
    markers :any[] = [], // 마커를 담을 배열입니다
    currCategory: string = category; // 현재 선택된 카테고리를 가지고 있을 변수입니다

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(NET_LOCATION.let, NET_LOCATION.lon), // 지도의 중심좌표
        level: 2 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption);


// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places(map); 

// 👦지도에 idle 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'idle', searchPlaces);


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
function addEventHandle(target: HTMLDivElement, type: keyof HTMLElementEventMap, callback: EventListenerOrEventListenerObject) {
    target.addEventListener(type, callback);
}



// 카테고리 검색을 요청하는 함수입니다
function searchPlaces() {
  if (!currCategory) {
      return;
  }
  // 커스텀 오버레이를 숨깁니다 
  placeOverlay.setMap(null);

  // 지도에 표시되고 있는 마커를 제거합니다
  removeMarker();
  ps.categorySearch(currCategory, placesSearchCB, {useMapBounds:true}); 
}




// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data: Array<place>, status: string, pagination: number) {
    //localstorage
    // const newDB=[...data.filter((v: place)=>DB.every((s:place)=>s.id !== v.id))];
    // const likeAdd =newDB.forEach((v)=>{v.like=0});
    // // const newarr=DB.push(...data.filter(v=>DB.every(s=>s.id !== v.id)));
    // const newarr=DB.push(...data.filter((v: place)=>DB.every((s:place)=>s.id !== v.id)));
    // const newarr=DB.push(newDB)
    // const likeAdd =DB.forEach((v)=>{console.log(v); v.like=0})
    localStorage.setItem('DB',JSON.stringify(DB));
    setPlaceList(data)
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
function displayPlaces(places : Array<place>) {
  // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
  // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
  var order = document.getElementById(currCategory)!.getAttribute('data-order')!;

  for ( var i=0; i<places.length; i++ ) {

          // 마커를 생성하고 지도에 표시합니다
          var marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order);

          // 마커와 검색결과 항목을 클릭 했을 때
          // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
          (function(marker, place) {
              kakao.maps.event.addListener(marker, 'click', function() {
                  displayPlaceInfo(place);
              });
          })(marker, places[i]);
  }
}



// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position: any, order: string) {
  var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(27, 28),  // 마커 이미지의 크기
      imgOptions =  {
          spriteSize : new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
          spriteOrigin : new kakao.maps.Point(46, ( Number(order) *36)), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(11, 28) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
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


// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
  for ( var i = 0; i < markers.length; i++ ) {
      markers[i].setMap(null);
  }   
  markers = [];
}


// 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
function displayPlaceInfo (place:place) {
  // var content = '<div class="placeinfo">' +
  //             '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';   
  // if (place.road_address_name) {
  //     content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
  //                 '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
  // }  else {
  //     content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
  // }                
  // content += '    <span class="tel">' + place.phone + '</span>' + 
  //             '</div>' + 
  //             '<div class="after"></div>';
let content =  ` 
<div class="placeinfo">  
 <a class="title" href=${place.place_url} target="_blank" title=${place.place_name}>${place.place_name}</a> 
  <div class="contents">   
  <div>
      <iframe class="iframe" align="center" width="100%" height="100%" src=${place.place_url} name="test" id="test" frameborder="1" scrolling="yes" ></iframe>
      </div>
      <div> 
      <span title=${place.road_address_name}>${place.road_address_name}</span> 
        <span class="jibun" title=${place.address_name}>(지번 :${place.address_name})</span>  
        <span class="tel">${place.phone}</span>
        <div class="after"></div>
        </div>
  </div>
  </div>`

  contentNode.innerHTML = content;
  placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
  placeOverlay.setMap(map);  
}


// 각 카테고리에 클릭 이벤트를 등록합니다
function addCategoryClickEvent() {
  var category = document.getElementById('category'),
      children = category!.children;

  for (var i=0; i<children.length; i++) {
    let element: HTMLElement = children[i] as HTMLElement;
    element.onclick = onClickCategory;
  }
}

// 카테고리를 클릭했을 때 호출되는 함수입니다
function onClickCategory(this : any) {

  var id = this.id,
      className = this.className;

  placeOverlay.setMap(null);

  if (className === 'on') {
      currCategory = '';
      changeCategoryClass();
      removeMarker();
  } else {
      currCategory = id;
      changeCategoryClass(this);
      searchPlaces();
  }
}

// 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
function changeCategoryClass(el?: HTMLElement) {
  var category = document.getElementById('category'),
      children = category!.children,
      i;

  for ( i=0; i<children.length; i++ ) {
      children[i].className = '';
  }

  if (el) {
      el.className = 'on';
  } 
}
},[DB, category]);

  return (
    <>
  <Container className="map_wrap">
      <Contents>
    <MapSection id="map" >
    <ul id="category">
        {/*<li id="CE7" data-order="4"> */}
        {/*    <span class="category_bg cafe"></span>*/}
        {/*    카페*/}
        {/*</li>  */}
        {/*<li id="FD6" data-order="5"> */}
        {/*    <span class="category_bg store"></span>*/}
        {/*    음식점*/}
        {/*</li>*/}
        <li id={CATEGORY.CONVEN} data-order="5">
            <span className="category_bg store"></span>
            편의점
        </li>
    </ul>
  </MapSection>
         
  </Contents>
  <LeftListSection>
      <MainTitle>{'편의점 실시간 리스트  '}{`${placeList.length}개`}</MainTitle>
  {placeList.length ? placeList.map((place,index) => {
    return(
    <div className='categoryList'>
        {`${index}. `}
    <span>{place['place_name']}</span>
     <span>{(place['category_name'] as string).split(">").pop()}</span>
     <a href={place['place_url']}>👉자세히 보기</a>
        <button onClick={()=>onclickLike(place)}>{`좋아요 👍🏻`}</button>
    </div>)
  }):<div className='categoryList'>{'좌측 상단 카테고리를 클릭해주세요....'}</div>}
  
  </LeftListSection>
  </Container>

  </>
  )
}


export default MapContainer