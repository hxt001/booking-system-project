import { Calendar, Views, SlotInfo } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BookingSystemContext from '../context/BookingSystemContext';
import { useCallback, useContext, useState } from 'react';
import { Container, } from '@mui/material';
import EventDetailsModal from './EventDeailsModal';
import ErrorModal from './ErrorModal';
import NewAvailabilityModal from './NewAvailabilityModal';
import { Event } from '../utils/CalendarUtils';
import useCalendar from '../hooks/useCalendar';

export default function MyCalendar(): React.ReactElement {
  const { role } = useContext(BookingSystemContext);
  const isInstructor = role === 'Instructor';
  const titleAccessor = useCallback(
    (e: Event) =>
      e.type === 'Reservation' ? `${e.title} with ${isInstructor ? e.student : e.instructor}` : 'Available',
    [isInstructor]
  );

  const {
    localizer,
    selectedReservation,
    setSelectedReservation,
    events,
    setEvents,
    error,
    setError,
    onDetailsModalClose,
    onRangeChange,
  } = useCalendar(isInstructor);

  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);

  const onConfirmationModalClose = useCallback(
    () => { setSelectedSlot(null); }, []
  );
  const onErrorModalClose = useCallback(
    () => { setError(null); setSelectedSlot(null) }, [setError]
  );
  const onSelectedSlot = useCallback((slot: SlotInfo) => {
    const overlap = events.some(event =>
      event.end > slot.start && event.start < slot.end
    );
    const now = new Date();
    if (overlap) {
      setError('Your new availability cannot overlap with existing events');
    } else if (slot.start < now) {
      setError('Your cannot create availability for past');
    } else {
      setSelectedSlot(slot);
    }
  }, [events, setError]);
  const onEventSelected = useCallback(
    (event) => {
      if (event.type === 'Reservation') {
        setSelectedReservation(event);
      }
    }, [setSelectedReservation]
  );

  return (
    <>
      <Container>
        <Calendar
          popup
          selectable={isInstructor ? 'ignoreEvents' : false}
          titleAccessor={titleAccessor}
          localizer={localizer}
          events={events}
          views={[Views.WEEK]}
          view={Views.WEEK}
          onSelectEvent={onEventSelected}
          onSelectSlot={onSelectedSlot}
          onRangeChange={onRangeChange}
        />
      </Container>
      <EventDetailsModal
        reservation={selectedReservation}
        onClose={onDetailsModalClose}
      />
      <ErrorModal
        errorMsg={error}
        onClose={onErrorModalClose}
      />
      <NewAvailabilityModal
        slot={selectedSlot}
        onClose={onConfirmationModalClose}
        setEvents={setEvents}
        setError={setError}
      />
    </>
  );
}