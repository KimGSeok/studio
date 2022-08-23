import styled from '@emotion/styled';
import Map from '../../components/Map';

const Yeonhui = () =>{
  return(
    <Main>
      <PageWrap>
        <PageTitle>오시는 길</PageTitle>
        <MapTitle>
          주소 : 서울 서대문구 연희동 200-20 / 서대문구 증가로 2안길 6<br/>
          네비게이션 : ‘메종드시리‘ 검색
        </MapTitle>
        <ParkingInfo>1팀 당 1대 주차 가능하며, 초과 시 사전에 미리 상담 부탁드립니다.</ParkingInfo>
        <Map
          latitude={37.57202689671381}
          longitude={126.93041975183665}
        />
      </PageWrap>
    </Main>
  )
}

const Main = styled.div(
  {
    padding: '80px 12% 40px 12%',
    background: 'rgba(237, 221, 202, 1)',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      padding: '80px 9% 40px 9%',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      padding: '80px 6% 40px 6%',
    }
  },
)
const PageWrap = styled.div(
  {
    padding: '24px 0'
  }
)
const PageTitle = styled.div(
  {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    padding: '0 0 12px 0',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      fontSize: '1.5rem',
      padding: '0 0 8px 0',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      fontSize: '1.4rem',
      padding: '0 0 4px 0',
    }
  }
)
const MapTitle = styled.div(
  {
    fontWeight: '500',
    lineHeight: '1.4rem',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      fontSize: '0.95rem',
      lineHeight: '1.3rem',
      wordBreak: 'keep-all'
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      fontSize: '0.9rem',
      lineHeight: '1.2rem',
      wordBreak: 'keep-all'
    }
  }
)
const ParkingInfo = styled.div(
  {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    padding: '12px 0;',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      fontSize: '1.1rem',
      wordBreak: 'keep-all'
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      fontSize: '1rem',
      wordBreak: 'keep-all'
    }
  }
)

export default Yeonhui;