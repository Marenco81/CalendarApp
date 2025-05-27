import { useDispatch, useSelector } from "react-redux";
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const {events, activeEvent} = useSelector(state => state.calendar);
    const {user} = useSelector(state => state.auth);


    const setActiveEvent = (calendarEvent) => {
      dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async(calendarEvent) => {
      //TODO: llegar al backend

      try {
        //TODO: Update event
        if( calendarEvent.id) {
          //Actualizado
          await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
          dispatch(onUpdateEvent({...calendarEvent, user}) );
          return;

        }
          //Creando
          const {data} = await calendarApi.post('/events',  calendarEvent);
          dispatch (onAddNewEvent({...calendarEvent, id: data.evento.id, user}) )
      } catch (error) {
        console.log(error);
        Swal.fire('Error at saving', error.response.data.msg, 'error');
      }

      
      
    }

    const startDeletingEvent = async () => {
      //TODO: llegar al backend

      dispatch(onDeleteEvent())
    }

    const startLoadingEvent = async () => {

      try {
        const {data} = await calendarApi.get('/events');
        const events = convertEventsToDateEvents(data.events);
        dispatch( onLoadEvents( events ) );
        console.log(events);


      } catch (error) {
        console.log('Error loading Event');
        console.log(error);
      }
    }

    

  return {
    //Propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    //Metodos
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvent,
    startSavingEvent,
  }
}
