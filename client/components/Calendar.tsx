import styled from '@emotion/styled';
import FullCalendar from '@rmcooper/next-fullcalendar';
import dayGridPlugin from '@rmcooper/next-fullcalendar/daygrid';
import timeGridPlugin from '@rmcooper/next-fullcalendar/timegrid';
import interactionPlugin from '@rmcooper/next-fullcalendar/interaction';
import '@rmcooper/next-fullcalendar/common/main.css'
import '@rmcooper/next-fullcalendar/daygrid/main.css'
import '@rmcooper/next-fullcalendar/timegrid/main.css'
import { useEffect, useState } from 'react';

interface LProps{
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
}

const Calendar = ({ data }: ListProps) =>{

  const [ isLoad, setIsLoad ] = useState(false);

  useEffect(() =>{
    setIsLoad(true);
  },[])

  return(
    <FullCalendarWrap>
      {
        isLoad ?
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin
          ]}
          initialView="dayGridMonth"
        /> : ''
      }
    </FullCalendarWrap>
  )
}

const FullCalendarWrap = styled.div(
  {
    padding: '20px 0',
    fontSize: '0.9rem'
  }
)

export default Calendar;