import { useRef, useState } from 'react';
import { GetServerSideProps } from "next";
import Image from 'next/image';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Router from 'next/router';
import axios from 'axios';
import Modal from '../../components/Modal';
import { masking } from '../../modules/validation';
import Pagination from '../../components/Pagination';

interface THProps{
  width: string;
}

interface LProps{
  id: number;
  title: string;
  name: string;
  view: number;
  is_over_hour: number;
  create_time: string;
  recent_update_time: string;
}

interface PProps{
  [key: string]: number;
}

interface ListProps{
  data: LProps[];
  paging: PProps;
  cookie: string;
}

const API_URL = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'http://localhost:3001/server' : 'http://www.maisondesiri.com/server';
const Reservation = ({ data, paging, cookie }: ListProps) =>{

  // State
  const [ isReservationList, setIsReservationList ] = useState(data);
  const [ reservationId, setReservationId ] = useState<number>();
  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const [ isCertification, setIsCertification ] = useState<boolean>(false);
  const [ listSeq, setListSeq ] = useState<number>(paging.max);
  const [ listPaging, setListPaging ] = useState<any>(paging);

  // Ref
  const categoryRef = useRef<HTMLSelectElement>(null); // 검색 카테고리
  const keywordRef = useRef<HTMLInputElement>(null); // 검색어
  const passwordRef = useRef<HTMLInputElement>(null); // 비밀번호 확인

  let isListSeq = listSeq;

  /* 상세 페이지 */
  const goDetail = (id: number) =>{
    if(cookie != 'empty'){
      Router.push({
        pathname: `/reservation/${id}`,
      })
    }else{
      setReservationId(id);
      setIsOpen(!isOpen);
    }
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
    const res = await fetch(`${API_URL}/reservation?category=${category}&keyword=${keyword}&page=${page}`)
    const { result, paging } = await res.json();

    setListSeq(paging.max);
    setListPaging(paging);
    setIsReservationList(result);
  }

  return(
    <Main>
      <PageIntroWrap>
        <SearchInfo>전체 검색결과는 &#91; <SearchCount>{listPaging.totalCount}</SearchCount> &#93; 건 입니다.</SearchInfo>
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
                        value.is_over_hour < 24 ? <NewList>N</NewList>: ''
                      }
                    </ReservationTData>
                    <ReservationTData>{masking(value.name)}</ReservationTData>
                    <ReservationTData>{value.view}회</ReservationTData>
                    <ReservationTData>{value.create_time}</ReservationTData>
                  </ReservationTrow>
                )
              })
              :
              <ReservationTrow>
                <ReservationTData css={css` display:revert !important; `}colSpan={5}>검색 결과가 없어요.</ReservationTData>
              </ReservationTrow>
            }
          </ReservationTbody>
        </ReservationTable>
        <Pagination
          paging={listPaging}
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
    padding: '80px 12% 0 12%',
    height: 'calc(100vh - 220px)',
    background: 'rgba(237, 221, 202, 1)',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      padding: '80px 9% 40px 9%',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      padding: '80px 6% 10px 6%',
      height: '75vh'
    }
  }
)
const PageIntroWrap = styled.div(
  {
    margin: '18px 0 12px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {

    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      display: 'grid'
    }
  }
)
const SearchInfo = styled.div(
  {
    fontSize: '1.2rem',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      fontSize: '1.1rem',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      fontSize: '1rem',
      marginBottom: '8px'
    }
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
    border: '1px solid #8a8a8a',
    minHeight: '32px',
    padding: '0 8px',
    fontSize: '1rem',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      minHeight: '30px',
      fontSize: '0.9rem',
      padding: '0 6px',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      minHeight: '28px',
      fontSize: '0.8rem',
      padding: '0 4px',
    }
  }
)
const SearchInput = styled.input(
  {
    minWidth: '340px',
    minHeight: '32px',
    padding: '0 12px',
    border: '1px solid #8a8a8a',
    borderLeft: '0',
    borderRight: '0',
    fontSize: '1rem',
    ':focus, :active':{
      outline: '0',
    },

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      minWidth: '280px',
      minHeight: '30px',
      fontSize: '0.9rem',
      padding: '0 10px',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      maxWidth: '170px',
      minWidth: '160px',
      minHeight: '28px',
      fontSize: '0.8rem',
      padding: '0 8px',
    }
  },
)
const SearchBtn = styled.div(
  {
    minHeight: '32px',
    maxHeight: '32px',
    padding: '5px 14px',
    fontSize: '1rem',
    border: '1px solid #8a8a8a',
    background: '#fff',
    cursor: 'pointer',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      minHeight: '30px',
      fontSize: '0.9rem',
      padding: '5px 10px',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      minHeight: '28px',
      fontSize: '0.8rem',
      padding: '5px 8px',
    }
  }
)
const WriteBtn = styled.div(
  {
    marginLeft: 'auto',
    display: 'block',
    minWidth: '80px',
    maxWidth: '100px',
    minHeight: '32px',
    background: '#fff',
    padding: '6px 12px',
    fontSize: '1rem',
    textAlign: 'center',
    borderRadius: '25px',
    fontWeight: '500',
    boxShadow: '0 1.5px 1px 1px rgb(100 100 100 / 10%)',
    cursor: 'pointer',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      minHeight: '30px',
      fontSize: '0.9rem',
      padding: '6px 10px',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      minWidth: '60px',
      maxWidth: '80px',
      minHeight: '28px',
      fontSize: '0.8rem',
      padding: '6px 8px',
    }
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
    borderTop: '1px solid #8a8a8a',
    borderBottom: '1px solid #8a8a8a',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {

    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      display: 'none'
    }
  }
)
const ReservationThrow = styled.tr(
  {
    borderBottom: '1px solid #8a8a8a',
  }
)
const ReservationTbody = styled.tbody(
  {
    /* Phone */
    '@media screen and (max-width: 480px)': {
      borderTop: '1px solid #8a8a8a'
    }
  }
)
const ReservationTrow = styled.tr(
  {
    borderBottom: '1px solid #8a8a8a',
    ':hover':{
      backgroundColor: '#f4f8f8',
      cursor: 'pointer'
    }
  }
)
const ReservationTheader = styled.th<THProps>(
  {
    padding: '8px 0',
    fontSize: '1.05rem',
    textAlign: 'center',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      fontSize: '0.9rem',
      lineHeight: '34px',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      fontSize: '0.7rem',
    }
  },
  props => ({
    width: props.width,

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      width: props.width,
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      width: `calc(${props.width} - 10px)`,
    }
  })
)
const ReservationTData = styled.td(
  {
    textAlign: 'center',
    padding: '8px',
    fontSize: '0.95rem',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      fontSize: '0.9rem',
      padding: '6px',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      fontSize: '1rem',
      padding: '8px',

      '&:nth-of-type(1), &:nth-of-type(5)':{
        display: 'none'
      },
    }
  }
)
const LockImg = styled(Image)(
  {
    cursor: 'pointer',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      width: '16px !important'
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      width: '16px !important'
    }
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

export const getServerSideProps: GetServerSideProps = async (appContext) =>{

  try{

    // Cookie
    const cookie = appContext.req.cookies.userACT;

    const res = await fetch(`${API_URL}/reservation`)
    const data = await res.json();

    return {
      props: {
        data: data.result,
        paging: data.paging,
        cookie: cookie ? cookie : 'empty'
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