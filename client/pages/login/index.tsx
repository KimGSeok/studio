import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Login = () =>{
  return(
    <Main>
      <LoginWrap>
        <Title>Maison de Siri</Title>
        <FormWrap>
          <FormRow>
            <FormInput
              type={"text"}
              placeholder={'아이디를 입력해주세요.'}
            />
          </FormRow>
          <FormRow>
            <FormInput
              type={"password"}
              placeholder={'비밀번호를 입력해주세요.'}
            />
          </FormRow>
          <FormRow>
            <LoginBtn>로그인</LoginBtn>
          </FormRow>
        </FormWrap>
        <CopyRight>©Maison de Siri All Rights Reserved.</CopyRight>
      </LoginWrap>
    </Main>
  )
}

const Main = styled.div(
  {
    padding: '80px 12% 40px 12%',
    height: 'calc(100vh - 220px)'
  }
)
const LoginWrap = styled.div(
  {
    width: '610px,',
    margin: '0 auto',
    marginTop: '120px',
    textAlign: 'center'
  }
)
const Title = styled.div(
  {
    fontSize: '2.3rem',
    fontWeight: '500',
    margin: '0 0 18px 0',
  }
)
const FormWrap = styled.form({})
const FormRow = styled.div(
  {
    margin: '0 0 12px 0',
  }
)
const FormInput = styled.input(
  {
    minWidth: '30%',
    minHeight: '36px',
    fontSize: '0.9rem',
    padding: '12px 10px',
    borderRadius: '4px',
    border: '1px solid #d6d6d6',
    outline: '0',
    ':focus':{
      border: '1px solid#1769FF'
    }
  }
)
const LoginBtn = styled.button(
  {
    minWidth: '30%',
    minHeight: '36px',
    backgroundColor: '#1769FF',
    border: '0',
    color: '#fff',
    padding: '12px 10px',
    fontSize: '1rem',
    fontWeight: '500',
    textAlign: 'center',
    borderRadius: '4px',
    cursor: 'pointer'
  }
)
const CopyRight = styled.div(
  {
    fontSize: '0.9rem'
  }
)

export default Login;