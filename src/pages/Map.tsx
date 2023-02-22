import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

declare global {
  interface Window {
    kakao: any;
  }
}
const { kakao } = window;

const Map = () => {
  const { state } = useLocation();

  let latitude: number = 37.5233511349545;
  let longitude: number = 127.037425209409;

  const [lat, setLat] = useState<number>(latitude);
  const [lon, setLon] = useState<number>(longitude);

  const navigate = useNavigate();

  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(lat, lon), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      const latlng = mouseEvent.latLng;

      setLat(latlng.getLat());
      setLon(latlng.getLng());
    });
  }, []);

  console.log(`${lat}, ${lon}`);

  const saveLocale = () => {
    navigate("/home", { state: { lat: lat, lon: lon } });
  };

  return (
    <>
      <div id="map">Map</div>
      <button onClick={saveLocale}>저장</button>
    </>
  );
};

export default Map;
