import { NextPage } from 'next';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Map from '../../components/Map';

const TapYeonhui = () =>{
  return(
    <ComponentWrap>
      <PageTitle>
        주소 : 서울 서대문구 연희동 200-20 / 서대문구 증가로 2안길 6<br/>
        네비게이션 : ‘메종드시리’ 검색
      </PageTitle>
      <ParkingInfo>1팀 당 1대 주차 가능하며, 초과 시 사전에 미리 상담 부탁드립니다.</ParkingInfo>
      <Map
        latitude={1}
        longitude={1}
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

export default TapYeonhui;