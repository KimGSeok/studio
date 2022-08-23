import { NextPage } from 'next';
import styled from '@emotion/styled';
// import Calendar from '../../components/Calendar';

const Seogyo:NextPage = () =>{
  return(
    <Main>
      <PageWrap>
        <PageTitle>Schedule(서교점)</PageTitle>
        <PageSubTitle>2022년 7월 말 오픈 준비중입니다.</PageSubTitle>
      </PageWrap>
    </Main>
  )
}

const Main = styled.div(
  {
    padding: '80px 12% 40px 12%',
    height: 'calc(100vh - 220px)',
    background: 'rgba(237, 221, 202, 1)',
  }
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
  }
)
const PageSubTitle = styled.div(
  {
    padding: '4px 0'
  }
)

export default Seogyo;