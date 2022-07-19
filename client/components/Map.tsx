import { useEffect } from "react";

interface MProps{
  latitude: number;
  longitude: number;
}

const Map = ({ latitude, longitude }: MProps) =>{

  useEffect(() => {

    const { kakao } = window;
    const container = document.getElementById('map');

  },[])
  
  return(
    <>
      지도
    </>
  )
}

export default Map;