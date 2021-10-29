import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from "@mui/material";
import moment from "moment";
import { useCallback, useState } from "react";
import { SlotInfo } from "react-big-calendar";
import { useParams } from "react-router";
import BookingSystemRequest from "../utils/BookingSystemRequest";
import { availabilityToEvents, DATE_FORMAT, Event } from "../utils/CalendarUtils";
import { RouteParams } from "../views/InstructorView";

interface Props {
    slot: SlotInfo | null,
    onClose: () => void,
    setEvents: (cb: (events: Event[]) => Event[]) => void,
    setError: (err: string) => void,
}

export default function NewAvailabilityModal({
    slot,
    onClose,
    setEvents,
    setError,
}: Props): React.ReactElement {
    const [isLoading, setIsLoading] = useState(false);
    const { username: instructorName } = useParams<RouteParams>();

    const onReequestFail = useCallback(() => {
        setIsLoading(false);
        setError('There has been an error creating your availability');
        onClose();
    }, [onClose, setError]);

    const onReequestSuccess = useCallback((res) => {
        setIsLoading(false);
        
        if (!Boolean(res)) {
            setError('There has been an error creating your availability');
        } else {
            const parsedRes = JSON.parse(res);
            setEvents((events) => [
                ...events,
                ...availabilityToEvents(parsedRes)
            ]);
        }
        onClose();
        
    }, [onClose, setError, setEvents]);

    const onSubmitNewAvailability = useCallback(() => {
        setIsLoading(true);

        new BookingSystemRequest(`${instructorName}/availabilities`, 'POST')
            .setPayload({
                fromUtc: moment(slot?.start).format(DATE_FORMAT),
                toUtc: moment(slot?.end).format(DATE_FORMAT),
                durationMinutes: 30,
            })
            .onSuccess(onReequestSuccess)
            .onFailure(onReequestFail)
            .onError(onReequestFail)
            .send();
    }, [instructorName, onReequestFail, onReequestSuccess, slot?.end, slot?.start]);

    return (
        <Dialog fullWidth maxWidth='sm' open={slot != null} onClose={onClose}>
            <DialogTitle>New Availability</DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    Are you sure you want to create the following avalilability?
                </DialogContentText>
                <DialogContentText>
                    From: {slot?.start.toLocaleString()}
                </DialogContentText>
                <DialogContentText>
                    To: {slot?.end.toLocaleString()}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button disabled={isLoading} onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={isLoading} onClick={onSubmitNewAvailability}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}