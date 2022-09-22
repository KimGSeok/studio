import { useEffect, useState, MouseEvent } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import FullCalendar from '@rmcooper/next-fullcalendar';
import dayGridPlugin from '@rmcooper/next-fullcalendar/daygrid';
import timeGridPlugin from '@rmcooper/next-fullcalendar/timegrid';
import interactionPlugin from '@rmcooper/next-fullcalendar/interaction';
import '@rmcooper/next-fullcalendar/common/main.css'
import '@rmcooper/next-fullcalendar/daygrid/main.css'
import '@rmcooper/next-fullcalendar/timegrid/main.css'

interface LProps{
  id: number;
  title: string;
  space: string;
  floor: string;
  room: string;
  name: string;
  view: number;
  is_over_hour: number;
  start_date: string;
  end_date: string;
  create_time: string;
  recent_update_time: string;
}

interface ListProps{
  events: any;
}

const API_URL = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'http://localhost:3001/server' : 'http://www.maisondesiri.com/server';
const Calendar = ({ events }: ListProps) =>{

  // Hooks
  const [ isLoad, setIsLoad ] = useState(false);
  const [ isShowDetailSchedule, setIsShowDetailSchedule ] = useState(false); // 우측 모달
  const [ reservationList, setReservationList ] = useState<LProps[]>();
  
  const onClickEventHandler = async(e: any) =>{

    // Id
    const id = e.event.id;

    // Fetching
    const res = await fetch(`${API_URL}/schedule/space/?space=${'yeonhui'}&id=${id}`)
    const data = await res.json();

    // Result
    setReservationList(data.result);

    setIsShowDetailSchedule(!isShowDetailSchedule);
  }

  const onCloseModalHandler = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();

    setIsShowDetailSchedule(!isShowDetailSchedule);
  }

  useEffect(() =>{
    setIsLoad(true);
  },[])

  return(
    <FullCalendarWrap>
      {
        isLoad ?
        <FullCalendar
          initialView="dayGridMonth"
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin
          ]}
          events={events}
          eventClick={onClickEventHandler}
          displayEventTime={false}
        /> : ''
      }
      {
        isShowDetailSchedule ?
        <DetailScheduleWrap>
          <DetailSchedule>
            <ScheduleInfoWrap>
              <ScheduleDate>예약현황</ScheduleDate>
              <CloseBtn
                src="/icons/close_black.svg"
                width={26}
                height={26}
                onClick={(e)=>onCloseModalHandler(e)}
              />
            </ScheduleInfoWrap>
            <ScheduleDetailInfoWrap>
              <ScheduleDetailInfo css={css`font-weight: bold;`}>&#91; 예약공간 &#93;</ScheduleDetailInfo>
              <ScheduleDetailInfo css={css`font-weight: bold;`}>예약 시작날짜</ScheduleDetailInfo>
              <ScheduleDetailInfo css={css`font-weight: bold;`}>예약 종료날짜</ScheduleDetailInfo>
            </ScheduleDetailInfoWrap>
            {
              reservationList ?
              reservationList.map((value, index) => {
                return(
                  <ScheduleDetailInfoWrap key={index}>
                    <ScheduleDetailInfo>&#91; {value.room === 'all' ? '전체' : `${value.floor}층 - ${value.room}`} &#93;</ScheduleDetailInfo>
                    <ScheduleDetailInfo>{value.start_date}</ScheduleDetailInfo>
                    <ScheduleDetailInfo>{value.end_date}</ScheduleDetailInfo>
                  </ScheduleDetailInfoWrap>
                )
              }) : ''
            }
          </DetailSchedule>
        </DetailScheduleWrap>
        : ''
      }
    </FullCalendarWrap>
  )
}

const FullCalendarWrap = styled.div(
  {
    padding: '20px 0',
    fontSize: '0.9rem',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      padding: '8px 0',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      fontSize: 'inherit'
    }
  }
)
const DetailScheduleWrap = styled.div(
  {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 999
  }
)
const DetailSchedule = styled.div(
  {
    width: '30%',
    height: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 3,
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px',
    padding: '10px 24px 10px 24px',
    overflowY: 'auto',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      width: '50%',
      padding: '10px 18px 10px 18px',
      fontSize: '1rem'
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      width: '90%',
      padding: '10px 12px 10px 12px',
      fontSize: '0.8rem'
    }
  }
)
const ScheduleInfoWrap = styled.div(
  {
    display: 'flex',
    alignItems: 'center',
    margin: '6px 0 12px 0',
    justifyContent: 'space-between'
  }
)
const ScheduleDetailInfoWrap = styled.div(
  {
    display: 'flex',
    backgroundColor: '#ededed',
    borderRadius: '6px',
    margin: '8px 0 0 0',
    padding: '6px 4px',
    justifyContent: 'space-around'
  }
)
const ScheduleDetailInfo = styled.div(
  {
    width: 'calc(33% - 12px)',
    padding: '6px 0',
    textAlign: 'center',
    borderRadius: '6px',
    backgroundColor: '#fff',
  }
)
const ScheduleDate = styled.div(
  {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  }
)
const CloseBtn = styled(Image)({
  cursor: 'pointer'
})

export default Calendar;