import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { useParams } from "react-router";
import BookingSystemContext from "../context/BookingSystemContext";
import BookingSystemRequest from "../utils/BookingSystemRequest";
import { Event, reservationToEvents } from "../utils/CalendarUtils";
import { RouteParams } from "../views/InstructorView";

interface Props {
    availability: Event | null,
    onClose: () => void,
    setEvents: (cb: (events: Event[]) => Event[]) => void,
    setError: (err: string) => void,
}

export default function NewReservationModal({
    availability,
    onClose,
    setEvents,
    setError,
}: Props): React.ReactElement {
    const [title, setTitle] = useState('');
    const onTitleChange = useCallback((e) => {
        setTitle(e.target.value);
    }, []);

    const { username: instructorUserName } = useParams<RouteParams>();
    const { username: studentUserName } = useContext(BookingSystemContext);
    const [isLoading, setIsLoading] = useState(false);

    const onReequestFail = useCallback(() => {
        setIsLoading(false);
        setError('There has been an error creating your reservation');
        onClose();
    }, [onClose, setError]);

    const onReequestSuccess = useCallback((res) => {
        setIsLoading(false);
        
        if (!Boolean(res)) {
            setError('There has been an error creating your reservation');
        } else {
            const parsedRes = JSON.parse(res);
            setEvents((events) => {
                const filteredEvents = events.filter((e) => e.id !== availability?.id);
                return [
                    ...filteredEvents,
                    ...reservationToEvents([parsedRes])
                ]
            });
        }
        onClose();
        
    }, [availability?.id, onClose, setError, setEvents]);


    const onSubmit = useCallback(() => {
        setIsLoading(true);
        new BookingSystemRequest(`${studentUserName}/reservations`, 'POST')
            .setPayload({
                availabilityId: availability?.id,
                description: title,
            })
            .onSuccess(onReequestSuccess)
            .onFailure(onReequestFail)
            .onError(onReequestFail)
            .send();
    }, [availability, onReequestFail, onReequestSuccess, studentUserName, title]);

    return (
        <Dialog fullWidth maxWidth='sm' open={availability != null} onClose={onClose}>
            <DialogTitle>New Meeting</DialogTitle>
            <DialogContent dividers>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    fullWidth
                    variant="standard"
                    onChange={onTitleChange}
                />
                <DialogContentText sx={{mt: 2}}>
                    From: {availability?.start.toLocaleString()}
                </DialogContentText>
                <DialogContentText sx={{mt: 1}}>
                    To: {availability?.end.toLocaleString()}
                </DialogContentText>
                <DialogContentText sx={{mt: 2}}>
                    Student: {studentUserName}
                </DialogContentText>
                <DialogContentText sx={{mt: 1}}>
                    Instructor: {instructorUserName}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button disabled={isLoading} onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={isLoading} onClick={onSubmit}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}