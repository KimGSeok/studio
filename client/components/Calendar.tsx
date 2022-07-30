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
  events: any;
}

const Calendar = ({ data, events }: ListProps) =>{

  const [ isLoad, setIsLoad ] = useState(false);

  const onClickEventHandler = (e: any) =>{

    const date = e.event.startStr;
    console.log(date);
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