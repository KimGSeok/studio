import { GetServerSideProps, NextPage } from "next";
import Router from "next/router";
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { useState } from "react";
import axios from 'axios';
axios.defaults.withCredentials = true;

interface FProps{
  title: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

interface EProps{
  height? : string;
}

const API_URL = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'http://localhost:3001/server' : 'http://www.maisondesiri.com/server';

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false
});

const DetailReservation:NextPage = () =>{

  const defaultText: string = `
    1.	업체명과 담당자 성함 : </br>
    2.	연락처 : </br>
    3.	촬영 날짜 : </br>
    4.	촬영 내용 : </br>
    5.	촬영 층 및 예약 시간 : </br>
    Ex) A 09~12, B 13~16 </br>
    6.	이용 인원 : </br>
    7.	입금자명 : </br>
    8.	방문 차량 유무(층당 1대씩 가능-추가 주차 필요시 상담 요망) : </br>
    9.	세금계산서 or 카드결제 or 현금영수증 여부 : </br>
    </br>
    ※	전체 대관 및 가구, CF 광고, 영상 촬영의 경우 별도 문의 바랍니다. </br>
    ※	예약 후 12시간 내에 예약금을 입금하지 않을 경우 예약이 자동 취소됩니다. </br>
  `

  const [ content, setContent ] = useState<string>(defaultText);

  /* Form Validation */
  const formValidation = yup.object().shape({
    name: yup.string()
      .required('성명을 입력해주세요.'),
    password: yup.string()
      .required('비밀번호를 입력해주세요.'),
    passwordConfirm: yup.string()
      .required('비밀번호를 다시 입력해주세요.')
      .oneOf([yup.ref('password')], '비밀번호가 일치하지 않아요.'),
  })
  
   /* useForm Destructuring */
   const { register, handleSubmit, formState: { errors } } = useForm<FProps>({
    resolver: yupResolver(formValidation)
  })

  /* Form Submit */
  const onSubmit = async(formData:any) => {

    const confirm = window.confirm('예약을 진행하시겠습니까?');
    if(confirm){

      // Set Data
      formData.title = '예약합니다';
      formData.content = content;

      const { result } = (await axios.post(`${API_URL}/reservation`, formData)).data;
      if(result.affectedRows > 0) {
        alert('예약이 완료되었습니다.');
        Router.push(
          '/reservation/reservation'
        )
      }else{
        alert('예약에 실패하였습니다.\n관리자에게 문의해주세요.');
        Router.push(
          '/reservation/reservation'
        )
      }
    }
  }

  return(
    <Main>
      <PageWrap>
        <PageIntro>정보를 양식에 맞추어 입력하시고, 예약을 진행해주세요!</PageIntro>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <FormHead>제목<FormSign> *</FormSign></FormHead>
            <FormValidationData>
              <FormInput value={"예약합니다"} readOnly/>
            </FormValidationData>
          </FormRow>
          <FormRow>
            <FormHead>성명<FormSign> *</FormSign></FormHead>
            <FormValidationData>
              <FormInput
                {...register("name")}
                type="text"
                name="name"
                placeholder={'예약자의 성명을 입력해주세요.'}
              />
              {errors?.name && <FormErrorMessage><FormSign>*</FormSign> {errors.name.message}</FormErrorMessage>}
            </FormValidationData>
          </FormRow>
          <FormRow>
            <FormHead>비밀번호<FormSign> *</FormSign></FormHead>
            <FormValidationData>
              <FormInput
                {...register("password")}
                type="password"
                name="password"
                placeholder={'비밀번호를 입력해주세요.'}
              />
              {errors?.password && <FormErrorMessage><FormSign>*</FormSign> {errors.password.message}</FormErrorMessage>}
            </FormValidationData>
          </FormRow>
          <FormRow>
            <FormHead>비밀번호 확인<FormSign> *</FormSign></FormHead>
            <FormValidationData>
              <FormInput
                {...register('passwordConfirm')}
                type="password"
                name="passwordConfirm"
                placeholder='비밀번호를 다시 입력해주세요.'
                autoComplete='off'
              />
              {errors?.passwordConfirm && <FormErrorMessage><FormSign>*</FormSign> {errors.passwordConfirm.message}</FormErrorMessage>}
            </FormValidationData>
          </FormRow>
          <FormRow>
            <FormHead height={'auto'}>내용<FormSign> *</FormSign></FormHead>
            <FormEditor>
              <SunEditor
                name="content"
                lang={"ko"}
                defaultValue={content}
                onChange={(content) => {
                  setContent(content)
                }}
                setOptions={{
                  height: '60vh',
                  buttonList: [
                    [
                      "formatBlock",
                      "font",
                      "fontSize",
                      "fontColor",
                      "align",
                      "paragraphStyle",
                      "blockquote"
                    ]
                  ]
                }}
              />
            </FormEditor>
          </FormRow>
          <FormBtnWrap>
            <FormBtn>작성하기</FormBtn>
          </FormBtnWrap>
        </Form>
      </PageWrap>
    </Main>
  )
}

const Main = styled.div(
  {
    padding: '80px 12% 40px 12%'
  }
)
const PageIntro = styled.div(
  {
    margin: '0 0 18px 0',
    fontWeight: '500',
    boxShadow: 'inset 0 -7px rgb(247 232 213 / 60%)',
    fontSize: '1.2rem',
    display: 'inline-block'
  }
)
const PageWrap = styled.div(
  {
    margin: '18px 0 12px 0',
  }
)
const Form = styled.form({})
const FormRow = styled.div(
  {
    width: '100%',
    display: 'flex',
    margin: '0 0 8px 0'
  }
)
const FormSign = styled.span(
  {
    position: 'relative',
    top: '2px',
    color: 'red'
  }
)
const FormErrorMessage = styled.div(
  {
    margin: '6px 0 0 0',
    color: 'red'
  }
)
const FormHead = styled.div<EProps>(
  {
    width: 'calc(15% - 4px)',
    height: '36px',
    backgroundColor: '#F2F2F7',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '1.05rem',
    margin: '0 8px 0 0'
  },
  props =>(
    {
      height: props.height ? props.height : '36px',
    }
  )
)
const FormValidationData = styled.div(
  {
    width: '50%'
  }
)
const FormEditor = styled.div(
  {
    width: 'calc(85% + 4px)',
    borderRadius: '6px',
    fontSize: '1.05rem'
  }
)
const FormInput = styled.input(
  {
    width: '100%',
    outline: '0',
    border: '1px solid #d6d6d6',
    borderRadius: '6px',
    fontSize: '1.05rem',
    padding: '7px 12px',
  }
)
const FormBtnWrap = styled.div({})
const FormBtn = styled.button(
  {
    marginLeft: 'auto',
    display: 'block',
    minWidth: '80px',
    maxWidth: '100px',
    minHeight: '36px',
    border: '1px solid #b8b8b8',
    backgroundColor: '#fff',
    padding: '8px 12px',
    fontSize: '1rem',
    textAlign: 'center',
    borderRadius: '4px',
    cursor: 'pointer'
  }
)

export const getServerSideProps: GetServerSideProps = async(context) =>{

  const { id }: any = context.params;

  const url = `${API_URL}/reservation/${id}`;
  const result = await axios.get(url);

  return{
    props:{

    }
  }
}

export default DetailReservation;