import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useCallback, useState } from 'react';
import { Container, } from '@mui/material';
import EventDetailsModal from './EventDeailsModal';
import { Event } from './MyCalendar';
import NewMeetingModal from './NewReservationModal';

export default function BookingCalendar(): React.ReactElement {
    const localizer = momentLocalizer(moment);
    const titleAccessor = useCallback(
        (e: Event) => e.title ?? 'Available',
        []
      );

    // Mocked Event
    const now = new Date();
    const anHourLater = new Date();
    anHourLater.setHours(now.getHours() + 4);
    const event: Event = {
        start: now,
        end: anHourLater,
        type: 'Availability',
    }

    const [selectedAvailability, setSelectedAvailability] = useState<Event | null>(null);
    const [selectedReservation, setSelectedReservation] = useState<Event | null>(null);
    const [events, setEvents] = useState<Array<Event>>([event]);

    const onDetailsModalClose = useCallback(
        () => { setSelectedReservation(null); }, []
    );
    const onCreationModalClose = useCallback(
        () => { setSelectedAvailability(null); }, []
    );
    const onEventSelected = useCallback(
        (event) => {
            if (event.type === 'Reservation') {
                setSelectedReservation(event);
            } else {
                setSelectedAvailability(event);
            }
        }, []
    );
    const onNewReservationCreated = useCallback(
        (newEvents: Array<Event>) => {
            const oldEvents = events.filter(e => e !== selectedAvailability);
            setEvents([...oldEvents, ...newEvents]);
            setSelectedAvailability(null);
        }, [events, selectedAvailability]
    );

    return (
        <>
            <Container>
                <Calendar
                    popup
                    localizer={localizer}
                    events={events}
                    views={[Views.WEEK]}
                    view={Views.WEEK}
                    titleAccessor={titleAccessor}
                    onSelectEvent={onEventSelected}
                />
            </Container>
            <EventDetailsModal
                reservation={selectedReservation}
                onClose={onDetailsModalClose} 
            />
            <NewMeetingModal
                availability={selectedAvailability}
                onClose={onCreationModalClose}
                createNewreservation={onNewReservationCreated} 
            />
        </>
    );
}