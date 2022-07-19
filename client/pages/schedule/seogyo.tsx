import { NextPage } from 'next';
import styled from '@emotion/styled';
// import Calendar from '../../components/Calendar';

const Seogyo:NextPage = () =>{
  return(
    <Main>
      <PageWrap>
        <PageTitle>Schedule(서교점)</PageTitle>
        <PageSubTitle>예약일정을 확인하신 후 양식에 맞추어 예약을 진행해주세요!</PageSubTitle>
      </PageWrap>
    </Main>
  )
}

const Main = styled.div(
  {
    padding: '80px 12% 40px 12%'
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