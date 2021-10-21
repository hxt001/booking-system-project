import { Calendar, Views, momentLocalizer, SlotInfo } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import BookingSystemContext from '../context/BookingSystemContext';
import { useCallback, useContext, useState } from 'react';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@mui/material';
import EventDetailsModal from './EventDeailsModal';

type EventType = 'Reservation' | 'Availability';

export interface Event {
  start: Date,
  end: Date,
  type: EventType,
  title?: string,
  instructor?: string,
  student?: string,
};

export default function MyCalendar(): React.ReactElement {
  const { role } = useContext(BookingSystemContext);
  const localizer = momentLocalizer(moment);

  // Mocked Event
  const now = new Date();
  const anHourLater = new Date();
  anHourLater.setHours(now.getHours() + 1);
  const event: Event = {
    start: now,
    end: anHourLater,
    type: 'Reservation',
    title: 'Mock Interview',
    instructor: 'HXT',
    student: 'Xiangyu',
  }

  const isInstructor = role === 'Instructor';
  const titleAccessor = useCallback(
    (e: Event) =>
      e.type === 'Reservation' ? `${e.title} with ${isInstructor ? e.student : e.instructor}` : 'Available',
    [isInstructor]
  );

  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);
  const [selectedReservation, setSelectedReservation] = useState<Event | null>(null);
  const [events, setEvents] = useState<Array<Event>>([event]);
  const [overlapped, setOverlapped] = useState<boolean>(false);

  const onDetailsModalClose = useCallback(
    () => { setSelectedReservation(null); }, []
  );
  const onConfirmationModalClose = useCallback(
    () => { setSelectedSlot(null); }, []
  );
  const onOverlapModalClose = useCallback(
    () => { setOverlapped(false); setSelectedSlot(null)}, []
  );
  const onSelectedSlot = useCallback((slot: SlotInfo) => {
    const overlap = events.some(event => 
      event.end > slot.start && event.start < slot.end
    );
    if (overlap){
      setOverlapped(true);
    } else{
      setSelectedSlot(slot);
    }
  }, [events]);
  const createNewAvailability = useCallback(() => {
    setEvents([
      ...events, 
      { 
        start: selectedSlot?.start as Date, 
        end: selectedSlot?.end as Date, 
        type: 'Availability',
      }
    ]);
    setSelectedSlot(null);
  }, [events, selectedSlot?.end, selectedSlot?.start]);
  const onEventSelected = useCallback(
    (event) => {
      if (event.type === 'Reservation') {
        setSelectedReservation(event);
      }
    }, []
  );

  return (
    <>
      <Container>
        <Calendar
          popup
          selectable={isInstructor ? 'ignoreEvents': false}
          titleAccessor={titleAccessor}
          localizer={localizer}
          events={events}
          views={[Views.WEEK]}
          view={Views.WEEK}
          onSelectEvent={onEventSelected}
          onSelectSlot={onSelectedSlot}
        />
      </Container>
      <EventDetailsModal reservation={selectedReservation} onClose={onDetailsModalClose} />
      <Dialog fullWidth maxWidth='sm' open={selectedSlot != null} onClose={onConfirmationModalClose}>
        <DialogTitle>New Availability</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Are you sure you want to create the following avalilability?
          </DialogContentText>
          <DialogContentText>
            From: {selectedSlot?.start.toLocaleString()}
          </DialogContentText>
          <DialogContentText>
            To: {selectedSlot?.end.toLocaleString()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirmationModalClose}>
            Cancel
          </Button>
          <Button onClick={createNewAvailability}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog fullWidth maxWidth='sm' open={overlapped} onClose={onOverlapModalClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Your new availability cannot overlap with an existing reservation or availability
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onOverlapModalClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}