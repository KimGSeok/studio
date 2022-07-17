import { NextPage } from 'next'
import styled from '@emotion/styled';

const Yeonhui:NextPage = () =>{

  const TabInfo = [ '1F', '2F', '3F', 'Garden' ];

  return(
    <Main>
      <PageIntroWrap>
        <PageTitle>서교점</PageTitle>
        2022년 7월 말 오픈 준비중입니다.
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

export default Yeonhui;