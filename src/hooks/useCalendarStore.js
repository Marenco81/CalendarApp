import { useDispatch, useSelector } from "react-redux";
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const {events, activeEvent} = useSelector(state => state.calendar);
    const {user} = useSelector(state => state.auth);


    const setActiveEvent = (calendarEvent) => {
      dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async(calendarEvent) => {
      //TODO: llegar al backend

      //TODO: Update event
      if( calendarEvent._id) {
        //Actualizado
        dispatch(onUpdateEvent({...calendarEvent}) )
      } else {
        //Creando
        const {data} = await calendarApi.post('/events',  calendarEvent);

        dispatch (onAddNewEvent({...calendarEvent, id: data.evento.id, user}) )
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
