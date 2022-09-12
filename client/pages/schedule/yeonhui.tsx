import { GetServerSideProps } from 'next';
import styled from '@emotion/styled';
import Calendar from '../../components/Calendar';
import { masking } from '../../modules/validation';

interface ReservationDetailProps{
  id: string | number;
  name: string;
  floor: string;
  room: string;
  reservation_start_date: string;
  reservation_end_date: string;
  reservation_start_date_time: string;
  reservation_end_date_time: string;
}

interface LProps extends ReservationDetailProps{
  id: number;
  title: string;
  name: string;
  view: number;
  is_over_hour: number;
  create_time: string;
  recent_update_time: string;
}

interface ListProps{
  data: LProps[];
  dayObject: any;
}

const API_URL = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'http://localhost:3001/server' : 'http://www.maisondesiri.com/server';
const Yeonhui = ({ data, dayObject }: ListProps) =>{

  let events: object[] = []; // Calendar Event Array
  data.map((obj: ReservationDetailProps) => {
    
    const location = obj.floor === 'all' ? '[ 전체 ] ': `[ ${obj.floor}층 - ${obj.room} ] `
    events.push({
      id: obj.id,
      title: location + masking(obj.name) + ' | ' + obj.reservation_start_date_time + '시 ~ ' + obj.reservation_end_date_time + '시',
      start: obj.reservation_start_date,
      end: obj.reservation_end_date,
      overlap: true,
    })
  });

  return(
    <Main>
      <PageWrap>
        <PageTitle>Schedule(연희점)</PageTitle>
        <PageSubTitle>예약일정을 확인하신 후 양식에 맞추어 예약을 진행해주세요!</PageSubTitle>
        <CalendarWrap>
          <Calendar
            events= {events}
          />
        </CalendarWrap>
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
const PageWrap = styled.div(
  {
    padding: '24px 0'
  }
)
const PageTitle = styled.div(
  {
    fontSize: '1.6rem',
    fontWeight: 'bold',
  }
)
const PageSubTitle = styled.div(
  {
    padding: '4px 0'
  }
)
const CalendarWrap = styled.div(
  {
    border: '1px solid #d6cbbf',
    padding: '4px 12px',
    margin: '16px 0',
    borderRadius: '8px'
  }
)

export const getServerSideProps:GetServerSideProps = async() =>{
  try{
    const res = await fetch(`${API_URL}/schedule?space=yeonhui`)
    const data = await res.json();

    return {
      props: {
        data: data.result,
        dayObject: data.dayObj
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

export default Yeonhui;