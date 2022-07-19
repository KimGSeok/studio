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

const Main = styled.div`
  padding: 80px 12% 40px 12%;
`
const PageIntroWrap = styled.div`
  margin: 18px 0;
`
const PageTitle = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`
const PageContent = styled.div(
  {
    margin: '16px 0 16px 0',
    padding: '16px 8px',
    fontSize: '1.2rem',
    border: '1px solid #e6e6e6',
    borderRadius: '6px'
  }
)
export default Yeonhui;