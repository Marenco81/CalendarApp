import { useDispatch, useSelector } from "react-redux";
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } from "../store";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const {events, activeEvent} = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
      dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async(calendarEvent) => {
      //TODO: llegar al backend

      //Todo bien
      if( calendarEvent._id) {
        //Actualizado
        dispatch(onUpdateEvent({...calendarEvent}) )
      } else {
        //Creando
        dispatch (onAddNewEvent({...calendarEvent, _id: new Date().getTime()}) )
      }
    }

    const startDeletingEvent = async () => {
      //TODO: llegar al backend

      dispatch(onDeleteEvent())
    }

    

  return {
    //Propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    //Metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  }
}
