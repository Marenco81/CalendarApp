import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns'
import { Navbar, CalendarEvent} from "../"
import { localizer, getMessagesES } from '../../helpers';



const events = [{
  title: 'Cumpleaños del jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Alvaro'
  }
}]

export const CalendarPage = () => {

  const eventStyleGetter = (event, start, end, isSelected) => {


    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color:'white'
    }

    return {
      style
    }
  }


  return (
    <>
      <Navbar></Navbar>

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '80vh', width:'95vw'}}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
    />
    </>
  )
}
