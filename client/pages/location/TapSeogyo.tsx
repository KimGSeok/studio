import { NextPage } from 'next';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Map from '../../components/Map';

const TapSeogyo = () =>{
  return(
    <ComponentWrap>
      <PageTitle>
        주소 : 서울 마포구 서교동 453-13 / 마포구 월드컵북로7길 38<br/>
        네비게이션 : ‘메종드시리‘ 검색
      </PageTitle>
      <ParkingInfo>1팀 당 1~2대 주차 가능하며, 초과 시 사전에 미리 상담 부탁드립니다.</ParkingInfo>
      <Map
        latitude={37.55780655266194}
        longitude={126.91599160434882}
      />
    </ComponentWrap>
  )
}

const ComponentWrap = styled.div(
  {
    padding: '4px 0'
  }
)
const PageTitle = styled.div(
  {
    fontWeight: '500',
    lineHeight: '1.4rem'
  }
)
const ParkingInfo = styled.div(
  {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    padding: '12px 0;'
  }
)

export default TapSeogyo;