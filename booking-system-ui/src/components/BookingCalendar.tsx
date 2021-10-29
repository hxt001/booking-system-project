import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useCallback, useState } from 'react';
import { Container, } from '@mui/material';
import EventDetailsModal from './EventDeailsModal';
import NewMeetingModal from './NewReservationModal';
import useCalendar from '../hooks/useCalendar';
import { Event } from '../utils/CalendarUtils';
import ErrorModal from './ErrorModal';

export default function BookingCalendar(): React.ReactElement {
    const titleAccessor = useCallback(
        (e: Event) => e.title ?? 'Available',
        []
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
    } = useCalendar(true);

    const [selectedAvailability, setSelectedAvailability] = useState<Event | null>(null);

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
        }, [setSelectedReservation]
    );
    const onErrorModalClose = useCallback(
        () => { setError(null); }, [setError]
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
            <NewMeetingModal
                availability={selectedAvailability}
                onClose={onCreationModalClose}
                setEvents={setEvents}
                setError={setError}
            />
        </>
    );
}