import { useEffect } from "react";
import styled from '@emotion/styled';

interface MProps{
  latitude: number;
  longitude: number;
}

const Map = (props: MProps) =>{

  const { latitude, longitude } = props;

  useEffect(() => {

    const { kakao } = window;
    const container = document.getElementById('map');

    const options = {
      center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
      level: 2
    };

    const map = new kakao.maps.Map(container, options);

    // 지도 타입 변경 컨트롤을 생성한다
    const mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 마커가 표시될 위치입니다 
    const markerPosition  = new kakao.maps.LatLng(latitude, longitude); 

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
        position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  },[])
  
  return(
    <KakaoMap id="map">
      지도
    </KakaoMap>
  )
}

const KakaoMap = styled.div(
  {
    height: '80vh'
  }
)

export default Map;