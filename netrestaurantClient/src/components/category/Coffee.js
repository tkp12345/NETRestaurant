import React, { useEffect } from "react";
import KakaoMapScript from "../../util/kakaoMapScript";
import styled from "styled-components";

const MapContainer = styled.div`
  margin: 0;
  padding: 0;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  font-size: 12px;
  position: relative;
  width: 100%;
  height: 350px;

  .placeinfo_wrap {
    position: absolute;
    bottom: 28px;
    left: -150px;
    width: 300px;
  }
  .placeinfo {
    position: relative;
    width: 100%;
    border-radius: 6px;
    border: 1px solid #ccc;
    border-bottom: 2px solid #ddd;
    padding-bottom: 10px;
    background: #fff;
  }
  .placeinfo:nth-of-type(n) {
    border: 0;
    box-shadow: 0px 1px 2px #888;
  }
  .placeinfo_wrap .after {
    content: "";
    position: relative;
    margin-left: -12px;
    left: 50%;
    width: 22px;
    height: 12px;
    background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
  }
  .placeinfo a,
  .placeinfo a:hover,
  .placeinfo a:active {
    color: #fff;
    text-decoration: none;
  }
  .placeinfo a,
  .placeinfo span {
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .placeinfo span {
    margin: 5px 5px 0 5px;
    cursor: default;
    font-size: 13px;
  }
  .placeinfo .title {
    font-weight: bold;
    font-size: 14px;
    border-radius: 6px 6px 0 0;
    margin: -1px -1px 0 -1px;
    padding: 10px;
    color: #fff;
    background: #d95050;
    background: #d95050
      url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png)
      no-repeat right 14px center;
  }
  .placeinfo .tel {
    color: #0f7833;
  }
  .placeinfo .jibun {
    color: #999;
    font-size: 11px;
    margin-top: 0;
  }

  .placeinfo button {
    border: 1px solid;
    background: transparent;
    padding: 4px;
    cursor: pointer;
    border-radius: 4px;
    margin-left: 8px;
    &:hover {
      background: #9bcef4;
    }
  }

  .row {
    display: flex;
    justify-content: center;
  }
`;

const Coffee = () => {
  useEffect(() => {
    KakaoMapScript();
  }, []);

  return (
    <MapContainer>
      <div
        id="myMap"
        style={{
          width: "800px",
          height: "700px",
        }}
      ></div>
    </MapContainer>
  );
};

export default Coffee;
