import React, { useState, MouseEvent, useEffect } from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import axios from 'axios';
import SpaceCheckBox from "../../components/SpaceCheckBox";
axios.defaults.withCredentials = true;

interface FProps{
  title: string;
  space: string;
  status: string;
  room: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

interface EProps{
  width? : string;
  height? : string;
}

interface SpaceInfoProps{
  [key: string]: string;
}

interface DProps{
  id: number;
  name: string;
  space: string;
  status: string;
  room: string;
  password: string;
  content: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  auth?: string;
}

interface DetailProps{
  data: DProps;
  reservationSpaceList: SpaceInfoProps[];
  cookie: string;
}

const API_URL = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'http://localhost:3001/server' : 'http://www.maisondesiri.com/server';
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false
});

const DetailReservation = ({ data, reservationSpaceList, cookie }: DetailProps) =>{

  // Result
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
  `;

  // Parameter
  const id = data.id ? data.id : ''; // 예약 고유 아이디
  const name = data.name ? data.name : ''; // 성명
  const status = data.status ? data.status : ''; // 예약상태
  let isAllSpaceCheck = false;

  // State
  const [ content, setContent ] = useState<string>(data.content ? data.content : defaultText); // 내용
  const [ space, setSpace ] = useState<string>(data.space ? data.space : 'yeonhui'); // 장소선택
  const [ isAllSpace, setIsAllSpace ] = useState<boolean>(isAllSpaceCheck); // 전체예약 여부
  const [ checkReservationList, setCheckReservationList ] = useState([]); // 선택한 공간

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

  /* 예약상태 변경 */
  const onChangeReservationStatusHandler = async(e: React.ChangeEvent<HTMLSelectElement>) =>{

    const value = e.target.value;
    const response = await axios.put(`${API_URL}/reservation/changeReservationStatus`, {
      id: id,
      status: value
    },{
      withCredentials: true 
    })

    const result = response.data.result;
    if(result[0].affectedRows > 0 && result[1].affectedRows > 0){
      alert("예약상태 변경이 완료되었습니다.");
    }else{
      alert("예약상태 변경중 에러가 발생하였습니다.\n관리자에게 문의해주세요.");
    }
  }

  /* Form Submit */
  const onSubmit = async(formData:any) => {
    
    // 공간선택
    if(checkReservationList.length > 0){
    
      const confirm = window.confirm('예약을 진행하시겠습니까?');
      if(confirm){
  
        // Set Data
        let result;
        formData.title = '예약합니다';
        formData.content = content;
        formData.space = space;
        formData.isAllSpace = isAllSpace;
        formData.reservationList = checkReservationList;
        status === '' ? formData.status = 'apply' : formData.status = status;
  
        if(id === '')
          result = (await axios.post(`${API_URL}/reservation`, formData, {
            withCredentials: true 
          })).data;
        else{
          formData.id = id;
          result = (await axios.put(`${API_URL}/reservation`, formData, {
            withCredentials: true 
          })).data;
        }
  
        // Result
        const response = result.result;

        if(response.affectedRows > 0 && id === '') {

          alert('예약이 완료되었습니다.');
          Router.push(
            '/reservation'
          )
        }else if(response.affectedRows > 0 && id !== ''){

          alert('예약이 수정되었습니다.');
          Router.push(
            '/reservation'
          )
        }else{

          alert('예약에 실패하였습니다.\n관리자에게 문의해주세요.');
          Router.push(
            '/reservation'
          )
        }
      }
    }else{
      alert("공간을 선택해주세요.");
      return false;
    }
  }

  /* 예약 삭제하기 */
  const deleteBtn = async(e: MouseEvent<HTMLDivElement>) =>{
    e.stopPropagation();

    const confirm = window.confirm('예약을 정말로 삭제하시겠습니까?');
    if(confirm){
      const { result } = (await axios.delete(`${API_URL}/reservation`, {
        data: {
          id: id
        }
      })).data;

      if(result.affectedRows > 0 ) {
        alert('예약이 삭제되었습니다.');
        Router.push(
          '/reservation'
        )
      }else{
        alert('예약 삭제에 실패하였습니다.\n관리자에게 문의해주세요.');
        Router.push(
          '/reservation'
        )
      }
    }
  }

  useEffect(() => {
    const result = data.auth;
    if(result === 'deny'){
      alert("접근할 수 없는 페이지입니다.");
      Router.push(
        '/reservation'
      )
    }
  },[])

  return(
    <Main>
      <PageWrap>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <PageIntroWrap>
            <PageIntro>정보를 양식에 맞추어 입력하시고, 예약을 진행해주세요!</PageIntro>
            {
              cookie != 'empty' ?
              <ReservationStatusSelect
                {...register("status")}
                name="status"
                onChange={(e) => onChangeReservationStatusHandler(e)}
                defaultValue={status}
              >
                <option value='apply'>예약신청</option>
                <option value='complete'>예약승인</option>
              </ReservationStatusSelect> : ''
            }
          </PageIntroWrap>
          <FormRow>
            <FormHead>제목<FormSign> *</FormSign></FormHead>
            <FormValidationData>
              <FormInput value={"예약합니다"} readOnly/>
            </FormValidationData>
          </FormRow>
          <FormRow>
            <FormHead>장소선택<FormSign> *</FormSign></FormHead>
            <FormValidationData>
              <SpaceSelect
                {...register("space")}
                name="space"
                defaultValue={space}
                onChange={(e)=>{setSpace(e.target.value)}}
              >
                <option value="yeonhui">연희점</option>
                {/* <option value="seogyo">서교점</option> */}
              </SpaceSelect>
              {errors?.name && <FormErrorMessage><FormSign>*</FormSign> {errors.name.message}</FormErrorMessage>}
            </FormValidationData>
          </FormRow>
          <FormRow>
            <FormHead>공간선택<FormSign> *</FormSign></FormHead>
            <FormValidationData>
              <SpaceCheckBox
                space={space}
                reservationId={id}
                isAllSpace={isAllSpace}
                setIsAllSpace={setIsAllSpace}
                checkReservationList={checkReservationList}
                reservationSpaceList={reservationSpaceList}
                setCheckReservationList={setCheckReservationList}
              />
            </FormValidationData>
            {
              cookie != 'empty' && reservationSpaceList && reservationSpaceList.length > 0 ?
              <FormValidationAdminData>
                <AdminDataHeadWrap>
                  <AdminDataHead width={'15%'}>층</AdminDataHead>
                  <AdminDataHead width={'25%'}>공간</AdminDataHead>
                  <AdminDataHead width={'30%'}>시작날짜</AdminDataHead>
                  <AdminDataHead width={'30%'}>예약날짜</AdminDataHead>
                </AdminDataHeadWrap>
                {
                  reservationSpaceList.map((value: any, index: any) => {
                    return(
                      <AdminDataWrap key={index}>
                        <AdminDataBodyWrap>
                          <AdminDataBody width={'15%'}>{value.floor}층</AdminDataBody>
                          <AdminDataBody width={'25%'}>{value.room}</AdminDataBody>
                          <AdminDataBody width={'30%'}>{value.start_date_format}</AdminDataBody>
                          <AdminDataBody width={'30%'}>{value.end_date_format}</AdminDataBody>
                        </AdminDataBodyWrap>
                      </AdminDataWrap>
                    )
                  })
                }
              </FormValidationAdminData>
              : ''
            }
          </FormRow>
          <FormRow>
            <FormHead>성명<FormSign> *</FormSign></FormHead>
            <FormValidationData>
              <FormInput
                {...register("name")}
                type="text"
                name="name"
                defaultValue={name}
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
            <ListBtn
              onClick={() => Router.push({ pathname: `/reservation` })}
            >목록보기</ListBtn>
            <ActionBtnWrap>
              {
                id === '' ?
                <FormBtn>작성하기</FormBtn> :
                <>
                  <FormBtn>수정하기</FormBtn>
                  <DeleteBtn onClick={(e) => deleteBtn(e)}>삭제하기</DeleteBtn>
                </>
              }
            </ActionBtnWrap>
          </FormBtnWrap>
        </Form>
      </PageWrap>
    </Main>
  )
}

const Main = styled.div(
  {
    padding: '80px 12% 40px 12%',
    background: 'rgba(237, 221, 202, 1)',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      padding: '80px 9% 40px 9%',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      padding: '80px 6% 10px 6%',
      height: 'auto'
    }
  }
)
const PageIntroWrap = styled.div(
  {
    display: 'flex',
    margin: '0 0 18px 0',
    justifyContent: 'space-between',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      margin: '0 0 12px 0',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      margin: '0 0 8px 0',
      display: 'grid'
    }
  }
)
const PageIntro = styled.div(
  {
    fontWeight: '500',
    boxShadow: 'inset 0 -7px rgb(247 232 213 / 60%)',
    fontSize: '1.2rem',
    display: 'inline-block',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      fontSize: '1.1rem',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      fontSize: '1rem',
      wordBreak: 'keep-all',
      margin: '0 0 9px 0'
    }
  }
)
const ReservationStatusSelect = styled.select(
  {
    position: 'relative',
    right: '0',
    border: '1px solid #d6d6d6',
    minWidth: '120px',
    minHeight: '32px',
    padding: '0 8px',
    borderRadius: '4px',
    fontSize: '1rem'
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
    margin: '0 0 8px 0',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      margin: '0 0 7px 0',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      margin: '0 0 6px 0',
      display: 'grid'
    }
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
    width: 'calc(10% - 4px)',
    height: '36px',
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '1.05rem',
    margin: '0 8px 0 0',
    boxShadow: '0 1.5px 1px 1px rgb(100 100 100 / 10%)',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      width: 'calc(20% - 4px)',
      height: '36px',
      padding: '8px 12px',
      margin: '0 6px 0 0',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      width: 'calc(40% - 4px)',
      height: '32px',
      padding: '6px 8px 2px 2px',
      margin: '0 4px 4px 0',
      backgroundColor: 'inherit',
      boxShadow: 'inherit',
      fontWeight: '500'
    }
  },
  props =>(
    {
      height: props.height ? props.height : '36px',
    }
  )
)
const FormValidationData = styled.div(
  {
    width: '60%',

    /* Phone */
    '@media screen and (max-width: 480px)': {
      width: '100%',
    }
  }
)
const FormValidationAdminData = styled.div(
  {
    width: 'calc(31% - (2% + 4px))',
    margin: '0 0 0 1%',
    backgroundColor: '#fff',
    border: '0',
    borderRadius: '4px',
    padding: '8px 12px',
    boxShadow: '0 1.5px 1px 1px rgb(100 100 100 / 10%)',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {

    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      width: '100%',
      margin: '12px 0 0 0',
      padding: '9px 6px',
    }
  }
)
const AdminDataWrap = styled.div(
  {
    fontSize: '0.85rem'
  }
)
const AdminDataHeadWrap = styled.div(
  {
    display: 'flex'
  }
)
const AdminDataHead = styled.div<EProps>(
  {
    textAlign: 'center',
    fontWeight: '500'
  },
  props =>(
    {
      width: props.width ? props.width : '25%',
    }
  )
)
const AdminDataBodyWrap = styled.div(
  {
    display: 'flex',
    margin: '6px 0'
  }
)
const AdminDataBody = styled.div<EProps>(
  {
    textAlign: 'center',
  },
  props =>(
    {
      width: props.width ? props.width : '25%',
    }
  )
)
const FormEditor = styled.div(
  {
    width: 'calc(90% + 4px)',
    borderRadius: '6px',
    fontSize: '1.05rem',
    border: '0',
    boxShadow: '0 1.5px 1px 1px rgb(100 100 100 / 10%)',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      width: 'calc(90% - 4px)',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      width: 'calc(100% - 4px)',
    }
  }
)
const SpaceSelect = styled.select(
  {
    height: '100%',
    position: 'relative',
    right: '0',
    border: '0',
    minWidth: '120px',
    minHeight: '32px',
    padding: '0 8px',
    borderRadius: '4px',
    fontSize: '1rem',
    boxShadow: '0 1.5px 1px 1px rgb(100 100 100 / 10%)'
  }
)
const FormInput = styled.input(
  {
    width: '100%',
    outline: '0',
    border: '0',
    borderRadius: '6px',
    fontSize: '1.05rem',
    padding: '7px 12px',
    boxShadow: '0 1.5px 1px 1px rgb(100 100 100 / 10%)'
  }
)
const FormBtnWrap = styled.div(
  {
    display: 'flex',
    justifyContent: 'space-between',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {

    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      margin: '12px 0 0 0'
    }
  }
)
const ListBtn = styled.div(
  {
    display: 'block',
    minWidth: '80px',
    maxWidth: '140px',
    minHeight: '36px',
    border: '0',
    backgroundColor: '#fff',
    padding: '8px 18px',
    fontSize: '1rem',
    textAlign: 'center',
    borderRadius: '25px',
    boxShadow: '0 1.5px 1px 1px rgb(100 100 100 / 10%)',
    cursor: 'pointer'
  }
)
const ActionBtnWrap = styled.div(
  {
    display: 'flex'
  }
)
const FormBtn = styled.button(
  {
    display: 'block',
    minWidth: '80px',
    maxWidth: '100px',
    minHeight: '36px',
    border: '0',
    backgroundColor: '#fff',
    padding: '8px 18px',
    fontSize: '1rem',
    textAlign: 'center',
    borderRadius: '25px',
    boxShadow: '0 1.5px 1px 1px rgb(100 100 100 / 10%)',
    cursor: 'pointer'
  }
)
const DeleteBtn = styled.div(
  {
    display: 'block',
    minWidth: '80px',
    maxWidth: '100px',
    minHeight: '36px',
    marginLeft: '12px',
    backgroundColor: '#636366',
    color: '#fff',
    padding: '8px 18px',
    fontSize: '1rem',
    textAlign: 'center',
    borderRadius: '25px',
    boxShadow: '0 1.5px 1px 1px rgb(100 100 100 / 10%)',
    cursor: 'pointer'
  }
)

export const getServerSideProps: GetServerSideProps = async(context) =>{

  try{
    const { id }: any = context.params;

    // Cookie
    const cookie = context.req.cookies.userACT;

    const url = `${API_URL}/reservation/${id}`;
    const result = await axios.get(url);

    return {
      props: {
        data: result.data.result,
        reservationSpaceList: result.data.reservationSpaceList ? result.data.reservationSpaceList : '',
        cookie: cookie ? cookie : 'empty'
      }
    }
  }catch(err){
    console.log("예약 상세페이지 조회중 에러발생");
    return{
      props: {
        result: err
      }
    }
  }
}

export default DetailReservation;