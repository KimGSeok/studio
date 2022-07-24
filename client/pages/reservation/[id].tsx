import { GetServerSideProps, NextPage, NextPageContext } from "next";
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { useState } from "react";
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'http://localhost:3001/server' : 'http://www.maisondesiri.com/server';

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false
});

const DetailReservation:NextPage = () =>{

  const [ content, setContent ] = useState<string>();
  
   /* useForm Destructuring */
  //  const { register, handleSubmit, formState: { errors } } = useForm({
  //   resolver: yupResolver(formValidation)
  // })

  // const { register, handleSubmit } = useForm({

  // })

  // const onSubmit = () => {
    
  // }


  // onSubmit={handleSubmit(onSubmit)}

  return(
    <Main>
      <PageWrap>
        <PageIntro>정보를 양식에 맞추어 입력하시고, 예약을 진행해주세요!</PageIntro>
        <Form >
          <FormRow>
            <FormHead>제목</FormHead>
            <FormInput value={"예약합니다"} readOnly/>
          </FormRow>
          <FormRow>
            <FormHead>성명</FormHead>
            <FormInput placeholder={'예약자의 성명을 입력해주세요.'}/>
          </FormRow>
          <FormRow>
            <FormHead>비밀번호</FormHead>
            <FormInput placeholder={'비밀번호를 입력해주세요.'}/>
          </FormRow>
          <FormRow>
            <FormHead>비밀번호 확인</FormHead>
            <FormInput placeholder={'비밀번호를 다시 입력해주세요.'}/>
          </FormRow>
          <FormRow>
            <FormHead>내용</FormHead>
            <FormEditor>
              <SunEditor
                name="content"
                defaultValue={content}
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
                    ],
                    [
                      "bold",
                      "underline",
                      "italic",
                      "strike",
                      "subscript",
                      "superscript"
                    ],
                    ["removeFormat"],
                    ["outdent", "indent"],
                    ["table", "list"],
                    ["link", "image", "video"]
                  ]
                }}
              />
            </FormEditor>
          </FormRow>
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
    margin: '0 0 12px 0',
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
    margin: '0 0 12px 0'
  }
)
const FormHead = styled.div(
  {
    width: 'calc(15% - 4px)',
    backgroundColor: '#F2F2F7',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '1.1rem',
    margin: '0 8px 0 0'
  }
)
const FormData = styled.div(
  {
    width: '50%',
    borderRadius: '6px',
    padding: '8px 12px',
    border: '1px solid #737366',
    fontSize: '1.1rem',
    margin: '0 8px 0 0'
  }
)
const FormEditor = styled.div(
  {
    width: '70%',
    borderRadius: '6px',
    fontSize: '1.1rem',
    margin: '0 8px 0 0'
  }
)
const FormInput = styled.input(
  {
    width: '50%',
    outline: '0',
    border: '1px solid #737366',
    borderRadius: '6px',
    fontSize: '1.1rem',
    padding: '7px 12px',
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