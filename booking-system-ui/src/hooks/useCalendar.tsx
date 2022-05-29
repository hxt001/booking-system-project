import moment from "moment";
import { useCallback, useContext, useEffect, useState } from "react";
import { DateLocalizer, momentLocalizer } from "react-big-calendar";
import { useParams } from "react-router";
import BookingSystemContext from "../context/BookingSystemContext";
import BookingSystemRequest from "../utils/BookingSystemRequest";
import { availabilityToEvents, DATE_FORMAT, Event, EventType, reservationToEvents } from '../utils/CalendarUtils';
import { RouteParams } from "../views/InstructorView";

interface CalendarState {
    localizer: DateLocalizer,
    selectedReservation: Event | null,
    setSelectedReservation: (e: Event | null) => void,
    events: Array<Event>,
    setEvents:(cb: Event[] | ((events: Event[]) => Event[])) => void,
    error: string | null,
    setError: (e: string | null) => void,
    onDetailsModalClose: () => void,
    onRangeChange: (range: any) => void,
}

export default function useCalendar(includeAvailability: boolean): CalendarState {
    const localizer = momentLocalizer(moment);
    const [selectedReservation, setSelectedReservation] = useState<Event | null>(null);
    const [events, setEvents] = useState<Array<Event>>([]);
    const [error, setError] = useState<string | null>(null);

    const onDetailsModalClose = useCallback(
        () => { setSelectedReservation(null); }, []
    );

    const { username: routeUsername } = useParams<RouteParams>();

    const {username: viewerUserName} = useContext(BookingSystemContext);

    const [rangeStart, setRangeStart] = useState(moment().startOf('week').toDate());
    const [rangeEnd, setRangeEnd] = useState(moment().endOf('week').toDate());
    const rangeStartString = moment(rangeStart).format(DATE_FORMAT);
    const rangeEndString = moment(rangeEnd).format(DATE_FORMAT);

    useEffect(() => {
        // Fetch Reservations
        const onFetchSuccess = (type: EventType) => (res: string) => {
            const parsed = JSON.parse(res);
            let newEvents = type === 'Reservation' ? reservationToEvents(parsed) : availabilityToEvents(parsed);
            setEvents((events) => [
                    ...events,
                    ...newEvents,
                ]
            );
        };
        
        setEvents([]);
        const reservationPath = `${viewerUserName}/reservations?from=${rangeStartString}&to=${rangeEndString}`
        new BookingSystemRequest(reservationPath, 'GET')
            .onSuccess(onFetchSuccess('Reservation'))
            .onFailure(() => setError('There has been an error getting reservations'))
            .onError(() => setError('There has been an error getting reservations'))
            .send();

        if (includeAvailability) {
            const availabilityPath = `${routeUsername}/availabilities?from=${rangeStartString}&to=${rangeEndString}`
            new BookingSystemRequest(availabilityPath, 'GET')
                .onSuccess(onFetchSuccess('Availability'))
                .onFailure(() => setError('There has been an error getting availabilities'))
                .onError(() => setError('There has been an error getting availability'))
                .send();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rangeStartString, rangeEndString, includeAvailability]);

    const onRangeChange = useCallback((dates) => {
        setRangeStart(dates[0]);
        setRangeEnd(dates[6]);
    }, []);

    return {
        localizer,
        selectedReservation,
        setSelectedReservation,
        events,
        setEvents,
        error,
        setError,
        onDetailsModalClose,
        onRangeChange,
    }
}