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
  const [cityName, setCityName] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(latitude, longitude), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    const marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
      infowindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      const latlng = mouseEvent.latLng;

      searchAddrFromCoords(map.getCenter(), displayCenterInfo);

      function searchAddrFromCoords(coords, callback) {
        // 좌표로 행정동 주소 정보를 요청합니다
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
      }

      function displayCenterInfo(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var infoDiv = document.getElementById("centerAddr");

          for (var i = 0; i < result.length; i++) {
            // 행정동의 region_type 값은 'H' 이므로
            if (result[i].region_type === "H") {
              infoDiv.innerHTML = result[i].address_name;
              setCityName(result[i].address_name);
              break;
            }
          }
        }
      }

      marker.setPosition(mouseEvent.latLng);
      marker.setMap(map);

      setLat(latlng.getLat());
      setLon(latlng.getLng());

      kakao.maps.event.addListener(map, "idle", function () {
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);
      });
    });
  }, []);

  console.log(`${lat}, ${lon}`);

  const saveLocale = () => {
    navigate("/home", { state: { lat: lat, lon: lon, cityName: cityName } });
  };

  return (
    <>
      <div id="map">Map</div>
      <div className="hAddr">
        <span className="title">지도중심기준 행정동 주소정보</span>
        <span id="centerAddr"></span>
      </div>
      <button onClick={saveLocale}>저장</button>
    </>
  );
};

export default Map;
