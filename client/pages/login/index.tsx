import { GetServerSideProps } from "next";
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoginAction } from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import { setCookie } from '../../modules/cookie';

import { Cookies } from 'react-cookie';
const cookies = new Cookies();

interface FProps{
  id: string;
  password: string;
}

const API_URL = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'http://localhost:3001/server' : 'http://www.maisondesiri.com/server';
const Login = () =>{

  // Hooks
  const router = useRouter();
  const dispatch = useDispatch();

  /* Form Validation */
  const formValidation = yup.object().shape({
    id: yup.string()
      .required('아이디를 입력해주세요.'),
    password: yup.string()
      .required('비밀번호를 입력해주세요.'),
  })

  /* useForm Destructuring */
  const { register, handleSubmit, formState: { errors } } = useForm<FProps>({
    resolver: yupResolver(formValidation)
  })

  /* Form Submit */
  const onSubmit = async(formData:any) => {

    const url = `${API_URL}/util/login`;

    // Result
    const result = dispatch(await LoginAction(url, formData));

    // Login Result
    const resultMessage = result.payload.message;
    const resultCode = result.payload.status;
    const token = result.payload.token;

    if(resultCode === 401){
      alert(resultMessage);
      return false;
    }else{
      setCookie(token);
      router.push({
        pathname: '/'
      })
    }
  }

  return(
    <Main>
      <LoginWrap>
        <Title>Maison de Siri</Title>
        <FormWrap onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <FormInput
              {...register("id")}
              type={"text"}
              name="id"
              placeholder={'아이디를 입력해주세요.'}
            />
            {errors?.id && <FormErrorMessage>{errors.id.message}</FormErrorMessage>}
          </FormRow>
          <FormRow>
            <FormInput
              {...register("password")}
              type={"password"}
              name="password"
              placeholder={'비밀번호를 입력해주세요.'}
            />
            {errors?.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
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
    padding: '80px 0 40px 0',
    height: 'calc(100vh - 220px)'
  }
)
const LoginWrap = styled.div(
  {
    width: '610px',
    margin: '0 auto',
    marginTop: '120px',
    textAlign: 'center',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      maxWidth: '610px',
      width: 'calc(100vw - 10%)',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      width: 'calc(100vw - 5%)',
    }
  }
)
const Title = styled.div(
  {
    fontSize: '2.3rem',
    fontWeight: '500',
    margin: '0 0 18px 0',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      fontSize: '2.2rem',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      fontSize: '2.1rem',
    }
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
    minWidth: '70%',
    minHeight: '36px',
    fontSize: '0.9rem',
    padding: '12px 10px',
    borderRadius: '4px',
    border: '1px solid #d6d6d6',
    outline: '0',
    ':focus':{
      border: '1px solid#1769FF'
    },

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      minWidth: '90%',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      minWidth: '80%',
    }
  }
)
const LoginBtn = styled.button(
  {
    minWidth: '70%',
    minHeight: '36px',
    backgroundColor: '#1769FF',
    border: '0',
    color: '#fff',
    padding: '12px 10px',
    fontSize: '1rem',
    fontWeight: '500',
    textAlign: 'center',
    borderRadius: '4px',
    cursor: 'pointer',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      minWidth: '90%',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      minWidth: '80%',
    }
  }
)
const CopyRight = styled.div(
  {
    fontSize: '0.9rem'
  }
)
const FormErrorMessage = styled.div(
  {
    minWidth: '70%',
    display: 'inline-block',
    textAlign: 'left',
    margin: '6px 0 0 0',
    padding: '4px 0 0 6px',
    color: 'red',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      minWidth: '90%',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      minWidth: '80%',
    }
  }
)

export const getServerSideProps: GetServerSideProps = async (appContext) =>{
  try{

    // Cookie
    const cookie = appContext.req.cookies.userACT;

    // Check Cookie
    if(cookie){
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }else{
      return{
        props: {}
      }
    }
  }catch(err){
    console.log("로그인 페이지 에러발생");
    return{
      props: {
        result: err
      }
    }
  }
}

export default Login;