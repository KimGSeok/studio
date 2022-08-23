import styled from '@emotion/styled';
import Map from '../../components/Map';

const Seogyo = () =>{
  return(
    <Main>
      <PageWrap>
        <PageTitle>오시는 길</PageTitle>
        <MapTitle>
          주소 : 서울 마포구 서교동 453-13 / 마포구 월드컵북로7길 38<br/>
          네비게이션 : ‘메종드시리‘ 검색
        </MapTitle>
        <ParkingInfo>1팀 당 1~2대 주차 가능하며, 초과 시 사전에 미리 상담 부탁드립니다.</ParkingInfo>
        <Map
          latitude={37.55780655266194}
          longitude={126.91599160434882}
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

export default Seogyo;