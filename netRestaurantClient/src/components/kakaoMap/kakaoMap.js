import React,{useState,useEffect} from 'react';

const { kakao } = window;

// 키워드로 장소검색하고 목록으로 표출하기 : https://apis.map.kakao.com/web/sample/keywordList/
// 카테고리별 장소 검색하기 : https://apis.map.kakao.com/web/sample/categoryFromBounds/
// 리액트로 kakao map api 구현 : https://developer0809.tistory.com/91

const KakaoMap = () => {
    // 검색결과 배열에 담아줌
    const [places, setPlaces] = useState([
        // 데이터 예)
        // ddress_name: "서울 영등포구 여의도동 28-1"
        // category_group_code: "FD6"
        // category_group_name: "음식점"
        // category_name: "음식점 > 양식"
        // distance: ""
        // id: "27353169"
        // phone: "02-2055-4442"
        // place_name: "세상의모든아침 여의도점"
        // place_url: "http://place.map.kakao.com/27353169"
        // road_address_name: "서울 영등포구 여의대로 24"
        // x: "126.91990886684258"
        // y: "37.52217248103947"
    ]);
    // const [score, setScore] = useState(0);

    useEffect(() => {
        // 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
        let placeOverlay = new kakao.maps.CustomOverlay({zIndex:1}), 
            contentNode = document.createElement('div'), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다 
            markers = []; // 마커를 담을 배열입니다

        // #1-1 지도 생성
        const container = document.getElementById('map');
        const mapOption = {
            center: new kakao.maps.LatLng(37.520126, 126.929827),
            level: 5 // 지도의 확대 레벨
        };
        const map = new kakao.maps.Map(container, mapOption);

        // #1-2 지도에 idle 이벤트를 등록합니다
        kakao.maps.event.addListener(map, 'idle', searchPlaces);
        
        // #2-1 커스텀 오버레이 컨텐츠를 설정합니다
        placeOverlay.setContent(contentNode);
        // #2-2 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다 
        contentNode.className = 'placeinfo_wrap';

        // #2-3 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
        // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다 
        addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
        addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);
        
        // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
        function addEventHandle(target, type, callback) {
            if (target.addEventListener) {
                target.addEventListener(type, callback);
            } else {
                target.attachEvent('on' + type, callback);
            }
        }

        // #3 장소 검색 객체를 생성 후 검색 요청
        /*
            1) 검색 요청될 때마다 마커를 다시 표시해주기 때문에, 현재 지도에 표시된 마커 제거
            2) 검색 요청
            3) 검색 요청 콜백함수에서 처리
             3-1) 데이터에 임시로 점수 데이터 0으로 초기화해서 추가
             3-2) 마커 표출, 목록 추가
             3-3) 목록에 페이지 기능 추가
             3-4) setPlaces:  useState로 생성한 변수에 json 데이터 set
        */
        const ps = new kakao.maps.services.Places(map);
        searchPlaces();


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

                // [수정 필요]백단에서 데이터 가져오게 되면 수정해야되는 코드, 임시로 데이터 가져올 때마다 0으로 초기화 하는 방식으로 함.
                data.map( (item) => {
                    return item.score = 0;
                });

                // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
                // 목록 추가
                displayPlaces(data);
                
                // 목록에 페이지 기능 추가
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

    const fnRearrange = () => {
        console.log('점수 변경으로 인한 목록 순위 변경');
        /*
            (기능 수정 필요) : dependency에 places를 넣으면 처음 화면 렌더링 되면서 데이터 받아오는 과정에서 2번 호출됨. -> 점수가 변경됐을 때만 호출 하도록 수정 되는지?
            -> useEffect로 하려했는데 일단 함수 형식으로 구현
        */

        for ( let i = 0; i < places.length-1; i++ ) {
            for ( let j = i+1; j < places.length; j++ ) {
                if ( places[i].score < places[j].score ) {
                    console.log(2);
                }
            }
        }


    }

    // 객체배열 update 방법: https://stackoverflow.com/questions/55987953/how-do-i-update-states-onchange-in-an-array-of-object-in-react-hooks
    // 음식 목록에서 점수를 update 합니다.
    const fnGood = (i) => {
        // e.preventDefault();
        // // 깊은 복사를 한 변수의 값을 변경해줍니다.
        var newArray = [...places];
        newArray[i].score = newArray[i].score + 1;

        setPlaces(newArray);
        fnRearrange();
    }

    const fnBad = (i) => (event) => {
        // // 깊은 복사를 한 변수의 값을 변경해줍니다.
        let newArray = [...places];
        newArray[i].score--;

        setPlaces(newArray);
        fnRearrange();
    }

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
                    {places.map((item, i) => (
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
                        <span className="scoreSpan">
                            {/*(백단 연결 후 기능추가 필요) 로그인 한 계정이 이미 눌렀으면 안 눌리는 기능 넣어야함*/}
                            <span className="score"><button id="scoreBtn" onClick={() => fnGood(i)}>👍</button></span>
                            <span className="score">{item.score}</span>
                            <span className="score"><button id="scoreBtn" onClick={fnBad(i)}>👎</button></span>                        
                        </span>
                    </li>
                    ))}
                    <div id="pagination"></div>
                </ul>
            </div>
            <div id="menu_wrap_rearrange" className="bg_white">
                <ul id="placesList">
                    {places.map((item, i) => (
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
                        <span className="scoreSpan">
                            {/*(백단 연결 후 기능추가 필요) 로그인 한 계정이 이미 눌렀으면 안 눌리는 기능 넣어야함*/}
                            {/* <span className="score"><button id="scoreBtn" onClick={() => fnGood(i)}>👍</button></span> */}
                            <span className="score">{item.score}</span>
                            {/* <span className="score"><button id="scoreBtn" onClick={fnBad(i)}>👎</button></span>                         */}
                        </span>
                    </li>
                    ))}
                    <div id="pagination"></div>
                </ul>
            </div>
        </div>
    );
};

export default KakaoMap;