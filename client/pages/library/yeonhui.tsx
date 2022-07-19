import { NextPage } from 'next';
import styled from '@emotion/styled';

const Yeonhui:NextPage = () =>{
  return(
    <Main>
      <PageWrap>
        <PageTitle>Library(연희점)</PageTitle>
        <PageSubTitle>아름다운 공간에서 촬영한 다양한 사진을 감상해보세요!</PageSubTitle>
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

export default Yeonhui;