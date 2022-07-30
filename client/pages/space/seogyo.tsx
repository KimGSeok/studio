import { NextPage } from 'next'
import styled from '@emotion/styled';

const Yeonhui:NextPage = () =>{

  const TabInfo = [ '1F', '2F', '3F', 'Garden' ];

  return(
    <Main>
      <PageIntroWrap>
        <PageTitle>서교점</PageTitle>
        <PageContent>
          2022년 7월 말 오픈 준비중입니다.
        </PageContent>
      </PageIntroWrap>
    </Main>
  )
}

const Main = styled.div(
  {
    height: 'calc(100vh - 220px)',
    padding: '80px 12% 40px 12%',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      height: '80vh',
      padding: '80px 9% 40px 9%',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      height: '75vh',
      padding: '80px 6% 40px 6%',
    }
  }
)
const PageIntroWrap = styled.div`
  margin: 18px 0;
`
const PageTitle = styled.div`
  font-size: 1.6rem;
  font-weight: bold;

  /* Tablet */
  @media screen and (max-width: 1024px){
    font-size: 1.5rem;
  }

  /* Phone */
  @media screen and (max-width: 480px){
    font-size: 1.4rem;
  }
`
const PageContent = styled.div(
  {
    margin: '8px 0 8px 0',
    padding: '4px 0',
    fontSize: '1.2rem',
    borderRadius: '6px',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      margin: '6px 0 6px 0',
      padding: '3px 0',
      fontSize: '1.1rem',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      margin: '4px 0 4px 0',
      padding: '2px 0',
      fontSize: '1rem',
    }
  }
)
export default Yeonhui;