import { useRef, useState } from 'react';
import { GetServerSideProps } from "next";
import Image from 'next/image';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Router from 'next/router';
import axios from 'axios';
import Modal from '../../components/Modal';
import Pagination from '../../components/Pagination';

interface THProps{
  width: string;
}

interface LProps{
  id: number;
  title: string;
  name: string;
  view: number;
  isOverHour: number;
  create_time: string;
  recent_update_time: string;
}

interface PProps{
  [key: string]: number;
}

interface ListProps{
  data: LProps[];
  paging: PProps;
}

const API_URL = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'http://localhost:3001/server' : 'http://www.maisondesiri.com/server';
const Reservation = ({ data, paging }: ListProps) =>{

  // State
  const [ isReservationList, setIsReservationList ] = useState(data);
  const [ reservationId, setReservationId ] = useState<number>();
  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const [ isCertification, setIsCertification ] = useState<boolean>(false);
  const [ page, setPage ] = useState();

  // Ref
  const categoryRef = useRef<HTMLSelectElement>(null); // 검색 카테고리
  const keywordRef = useRef<HTMLInputElement>(null); // 검색어
  const passwordRef = useRef<HTMLInputElement>(null); // 비밀번호 확인

  // Parameter
  let isListSeq = paging.max;

  /* 상세 페이지 */
  const goDetail = (id: number) =>{

    setReservationId(id);
    setIsOpen(!isOpen);

    // 관리자일 때
    // Router.push({
    //   pathname: `/reservation/${id}`,
    // })
  }

  /* 비밀번호 일치여부 확인 */
  const checkPassword = async() =>{

    // Parameter
    const password = passwordRef.current?.value;

    // Fetching
    const { data } = await axios.post(`${API_URL}/reservation/checkReservationPassword`,{
      reservationId: reservationId,
      checkPassword: password
    })

    setIsCertification(data.result);
    if(data.result){
      Router.push({
        pathname: `/reservation/${reservationId}`,
      })
    }else{
      alert("비밀번호가 일치하지 않습니다.");
    }
  }

  /* 검색하기 */
  const search = async(page: number) =>{

    // Parameter
    const category = categoryRef.current?.value;
    const keyword = keywordRef.current?.value;

    // Fetching
    const res = await fetch(`${API_URL}/reservation?category=${category}&keyword=${keyword}&page=${1}`)
    const { result } = await res.json();

    setIsReservationList(result);
  }

  return(
    <Main>
      <PageIntroWrap>
        <SearchInfo>전체 검색결과는 &#91; <SearchCount>{paging.max}</SearchCount> &#93; 건 입니다.</SearchInfo>
        <SearchWrap>
          <SearchCondition ref={categoryRef}>
            <option value="all">전체</option>
            <option value="reservation">예약자명</option>
          </SearchCondition>
          <SearchInput ref={keywordRef} placeholder="검색어를 입력해주세요."/>
          <SearchBtn onClick={() => search(1)}>검색하기</SearchBtn>
        </SearchWrap>
      </PageIntroWrap>
      <WriteBtn onClick={() =>
        Router.push({
        pathname: `/reservation/detail`,
      })}>글쓰기</WriteBtn>
      <PageContentWrap>
        <ReservationTable>
          <ReservationThead>
            <ReservationThrow>
              <ReservationTheader width={'6%'}>순번</ReservationTheader>
              <ReservationTheader width={'60%'}>제목</ReservationTheader>
              <ReservationTheader width={'10%'}>예약자명</ReservationTheader>
              <ReservationTheader width={'6%'}>조회수</ReservationTheader>
              <ReservationTheader width={'18%'}>작성날짜</ReservationTheader>
            </ReservationThrow>
          </ReservationThead>
          <ReservationTbody>
            {
              isReservationList.length != 0 ?
              isReservationList.map((value)=>{
                return(
                  <ReservationTrow key={value.id} onClick={()=>goDetail(value.id)}>
                    <ReservationTData>{isListSeq--}</ReservationTData>
                    <ReservationTData css={css`
                      text-align: left;
                      display: flex;
                      align-items: center;
                    `}>
                      {value.title}
                      <LockImg
                        css={css`
                          margin-left: 2px !important;
                        `}
                        src="/icons/lock_black.svg"
                        width={21}
                        height={21}
                      />
                      {
                        value.isOverHour < 24 ? <NewList>N</NewList>: ''
                      }
                    </ReservationTData>
                    <ReservationTData>{value.name}</ReservationTData>
                    <ReservationTData>{value.view}회</ReservationTData>
                    <ReservationTData>{value.create_time}</ReservationTData>
                  </ReservationTrow>
                )
              })
              :
              <ReservationTrow>
                <ReservationTData colSpan={5}>검색 결과가 없어요.</ReservationTData>
              </ReservationTrow>
            }
          </ReservationTbody>
        </ReservationTable>
        <Pagination
          paging={paging}
          search={search}
        />
      </PageContentWrap>
      {
        isOpen ?
        <Modal
          title={'예약시 입력하신 비밀번호를 입력해주세요.'}
          subTitle={'작성자와 관리자만 열람하실 수 있습니다.'}
          children={
            <PasswordWrap>
              <PasswordInput
                ref={passwordRef}
                type="password"
                placeholder='비밀번호를 입력해주세요.'
              />
              <PasswordBtn onClick={() => checkPassword()}>확인</PasswordBtn>
            </PasswordWrap>
          }
          isShow={isOpen}
          setIsShow={setIsOpen}
          setIsCertification={setIsCertification}
        /> : ''
      }
    </Main>
  )
}

const Main = styled.div(
  {
    padding: '80px 12% 40px 12%',
    height: 'calc(100vh - 220px)'
  }
)
const PageIntroWrap = styled.div(
  {
    margin: '18px 0 12px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
)
const SearchInfo = styled.div(
  {
    fontSize: '1.2rem',
  }
)
const SearchCount = styled.span(
  {
    fontWeight: 'bold'
  }
)
const SearchWrap = styled.div(
  {
    display: 'flex',
    alignItems: 'center'
  }
)
const SearchCondition = styled.select(
  {
    position: 'relative',
    right: '0',
    border: '1px solid #b3b3b3',
    minHeight: '32px',
    padding: '0 8px',
    fontSize: '1rem'
  }
)
const SearchInput = styled.input(
  {
    minWidth: '340px',
    minHeight: '32px',
    padding: '0 12px',
    border: '1px solid #b3b3b3',
    borderLeft: '0',
    borderRight: '0',
    fontSize: '1rem',
    ':focus, :active':{
      outline: '0',
    }
  },
)
const SearchBtn = styled.div(
  {
    minHeight: '32px',
    border: '1px solid #b8b8b8',
    padding: '5px 14px',
    fontSize: '1rem',
    cursor: 'pointer'
  }
)
const WriteBtn = styled.div(
  {
    marginLeft: 'auto',
    display: 'block',
    minWidth: '80px',
    maxWidth: '100px',
    minHeight: '32px',
    border: '1px solid #b8b8b8',
    padding: '6px 12px',
    fontSize: '1rem',
    textAlign: 'center',
    borderRadius: '4px',
    cursor: 'pointer'
  }
)
const PageContentWrap = styled.div(
  {
    margin: '12px 0 0 0'
  }
)
const ReservationTable = styled.table(
  {
    width: '100%',
    borderCollapse: 'collapse'
  }
)
const ReservationThead = styled.thead(
  {
    borderTop: '1px solid #e6e6e6',
    borderBottom: '1px solid #e6e6e6',
  }
)
const ReservationThrow = styled.tr(
  {
    borderBottom: '1px solid #e6e6e6',
  }
)
const ReservationTbody = styled.tbody(
  {
  }
)
const ReservationTrow = styled.tr(
  {
    borderBottom: '1px solid #e6e6e6',
    ':hover':{
      backgroundColor: '#f4f8f8',
      cursor: 'pointer'
    }
  }
)
const ReservationTheader = styled.th<THProps>(
  {
    padding: '8px 0',
    fontSize: '1.1rem'
  },
  props => ({
    width: props.width
  })
)
const ReservationTData = styled.td(
  {
    textAlign: 'center',
    padding: '12px 8px'
  }
)
const LockImg = styled(Image)(
  {
    cursor: 'pointer'
  }
)
const NewList = styled.span(
  {
    fontWeigth: 'bold',
    backgroundColor: '#ed4040',
    padding: '2px 6px',
    borderRadius: '6px',
    margin: '0 0 0 12px',
    color: '#fff'
  }
)
const PasswordWrap = styled.div(
  {
    display: 'flex',
    alignItems: 'center',
    margin: '18px 0 0 0'
  }
)
const PasswordInput = styled.input(
  {
    minWidth: '80%',
    maxWidth: '80%',
    outline: '0',
    minHeight: '36px',
    border: '1px solid #b8b8b8',
    padding: '6px 12px',
    fontSize: '1rem',
    ':focus, :active': {
      borderColor: '#5c4733'
    }
  }
)
const PasswordBtn = styled.div(
  {
    minWidth: '20%',
    maxWidth: '20%',
    minHeight: '36px',
    border: '1px solid #b8b8b8',
    padding: '7px 12px',
    textAlign: 'center',
    borderLeft: 0,
    cursor: 'pointer'
  }
)

export const getServerSideProps: GetServerSideProps = async () =>{

  try{
    const res = await fetch(`${API_URL}/reservation`)
    const data = await res.json();

    return {
      props: {
        data: data.result,
        paging: data.paging
      }
    }
  }catch(err){
    console.log("예약페이지 에러발생");
    return{
      props: {
        result: err
      }
    }
  }
}

export default Reservation;