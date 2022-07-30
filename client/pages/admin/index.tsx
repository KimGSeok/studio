import styled from '@emotion/styled';

const Admin = () =>{
  return(
    <Main>
      관리자 페이지
    </Main>
  )
}

const Main = styled.div(
  {
    padding: '80px 12% 40px 12%',
    height: 'calc(100vh - 220px)'
  }
)

export default Admin;