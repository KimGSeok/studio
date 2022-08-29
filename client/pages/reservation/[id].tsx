import React, { useState, MouseEvent, useEffect } from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import moment from 'moment';
import axios from 'axios';
import DatePicker from "../../components/DatePicker";
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
  height? : string;
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
  cookie: string;
}

const API_URL = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'http://localhost:3001/server' : 'http://www.maisondesiri.com/server';
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false
});

const DetailReservation = ({ data, cookie }: DetailProps) =>{

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
  const room = data.room ? data.room : ''; // 공간
  const status = data.status ? data.status : ''; // 예약상태

  // State
  const [ content, setContent ] = useState<string>(data.content ? data.content : defaultText); // 내용
  const [ space, setSpace ] = useState<string>(data.space ? data.space : 'yeonhui'); // 장소선택
  const [ startDate, setStartDate ] = useState<any>(data.start_date ? data.start_date : null); // 시작날짜
  const [ startTime, setStartTime ] = useState<any>(data.start_time ? data.start_time : '00:00'); // 시작시간
  const [ endDate, setEndDate ] = useState<any>(data.end_date ? data.end_date : null); // 종료날짜
  const [ endTime, setEndTime ] = useState<any>(data.end_time ? data.end_time : '01:00'); // 종료시간

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
    if(result. affectedRows > 0){
      alert("예약상태 변경이 완료되었습니다.");
    }else{
      alert("예약상태 변경중 에러가 발생하였습니다.\n관리자에게 문의해주세요.");
    }
  }


  /* Form Submit */
  const onSubmit = async(formData:any) => {

    // 시작날짜 Check
    if(startDate === null){
      alert("예약 시작날짜를 선택해주세요.");
      return false;
    }

    // 종료날짜 Check
    if(endDate === null){
      alert("예약 종료날짜를 선택해주세요.");
      return false;
    }

    const confirm = window.confirm('예약을 진행하시겠습니까?');
    if(confirm){

      // Set Data
      let result;
      formData.title = '예약합니다';
      formData.content = content;
      formData.startDate = moment(startDate).format(`YYYY-MM-DD ${startTime}:ss`);
      formData.endDate = moment(endDate).format(`YYYY-MM-DD ${endTime}:ss`);
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
                <option value="seogyo">서교점</option>
              </SpaceSelect>
              {errors?.name && <FormErrorMessage><FormSign>*</FormSign> {errors.name.message}</FormErrorMessage>}
            </FormValidationData>
          </FormRow>
          <FormRow>
            <FormHead>공간선택<FormSign> *</FormSign></FormHead>
            <FormValidationData>
              {/* <SpaceSelect
                {...register("room")}
                name="room"
                defaultValue={room}
              >
                <option value="1F - Kitchen, Room A">1F - Kitchen, Room A</option>
                <option value="1F - Room B, C">1F - Room B, C</option>
                <option value="1F - Bathroom">1F - Bathroom</option>
                <option value="2F - Living Room">2F - Living Room</option>
                <option value="2F - Kitchen">2F - Kitchen</option>
                <option value="2F - Room A">2F - Room A</option>
                <option value="2F - Room B">2F - Room B</option>
                <option value="2F - BathRoom">2F - BathRoom</option>
                <option value="3F - Central Space">3F - Central Space</option>
                <option value="3F - Room A">3F - Room A</option>
                <option value="3F - Room B">3F - Room B</option>
                <option value="3F - Room C">3F - Room C</option>
                <option value="Garden - Terrace">Garden - Terrace</option>
              </SpaceSelect> */}
              <SpaceCheckBox
                space={space}
              />
            </FormValidationData>
          </FormRow>
          <FormRow>
            <FormHead>날짜선택<FormSign> *</FormSign></FormHead>
            <FormValidationData>
              <DatePicker
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
              />
            </FormValidationData>
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
  }
)
const PageIntroWrap = styled.div(
  {
    display: 'flex',
    margin: '0 0 18px 0',
    justifyContent: 'space-between'
  }
)
const PageIntro = styled.div(
  {
    fontWeight: '500',
    boxShadow: 'inset 0 -7px rgb(247 232 213 / 60%)',
    fontSize: '1.2rem',
    display: 'inline-block'
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
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '1.05rem',
    margin: '0 8px 0 0',
    boxShadow: '0 1.5px 1px 1px rgb(100 100 100 / 10%)'
  },
  props =>(
    {
      height: props.height ? props.height : '36px',
    }
  )
)
const FormValidationData = styled.div(
  {
    width: '60%'
  }
)
const FormEditor = styled.div(
  {
    width: 'calc(85% + 4px)',
    borderRadius: '6px',
    fontSize: '1.05rem',
    border: '0',
    boxShadow: '0 1.5px 1px 1px rgb(100 100 100 / 10%)'
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
    justifyContent: 'space-between'
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