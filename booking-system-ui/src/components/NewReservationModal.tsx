import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useCallback, useContext, useMemo, useState } from "react";
import { useParams } from "react-router";
import BookingSystemContext from "../context/BookingSystemContext";
import { RouteParams } from "../views/InstructorView";
import { Event } from './MyCalendar';

interface Props {
    availability: Event | null,
    onClose: () => void,
    createNewreservation: (newEvents: Array<Event>) => void,
}

export default function NewReservationModal({
    availability,
    onClose,
    createNewreservation,
}: Props): React.ReactElement {
    const [start, setStart] = useState(availability?.start);
    const [end, setEnd] = useState(availability?.end);
    const [title, setTitle] = useState('');
    const { username: instructorUserName } = useParams<RouteParams>();
    const { username: studentUserName } = useContext(BookingSystemContext);

    const onTitleChange = useCallback((e) => {
        setTitle(e.target.value);
    }, []);
    const onStartChange = useCallback((e) => {
        setStart(new Date(e.target.value));
    }, []);
    const onEndChange = useCallback((e) => {
        setEnd(new Date(e.target.value));
    }, []);


    const onSubmit = useCallback(() => {
        if (availability != null && start != null && end != null) {
            const newEvents: Array<Event> = [];
            if (start > availability?.start) {
                newEvents.push({
                    start: availability.start,
                    end: start,
                    type: 'Availability',
                });
            }
            if (end < availability?.end) {
                newEvents.push({
                    start: end,
                    end: availability.end,
                    type: 'Availability',
                });
            }
            newEvents.push({
                start: start,
                end: end,
                type: 'Reservation',
                title: title,
                instructor: instructorUserName,
                student: studentUserName ?? 'Visitor',
            });
            createNewreservation(newEvents);
        }
    }, [availability, createNewreservation, end, instructorUserName, start, studentUserName, title]);

    const startOptions = useMemo(
        () => {
            if (availability?.start == null || availability?.end == null) {
                return [];
            }
            let current = new Date(availability.start);
            const result = [];
            while (current < availability.end) {
                result.push(current);
                current = new Date(current.getTime() + 30 * 60000);
            }
            return result;
        },
        [availability?.end, availability?.start]
    );

    const endOptions = useMemo(
        () => {
            if (start == null || availability?.end == null) {
                return [];
            }
            let current = new Date(start.getTime() + 30 * 60000);
            const result = [];
            while (current <= availability?.end) {
                result.push(current);
                current = new Date(current.getTime() + 30 * 60000);
            }
            return result;
        },
        [availability?.end, start]
    );

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
                <FormControl sx={{ mt: 2, mr: 2, minWidth: 100 }}>
                    <InputLabel htmlFor="start">From</InputLabel>
                    <Select
                        value={start}
                        onChange={onStartChange}
                        label="From"
                    >
                        {startOptions.map((date: Date) => (
                            <MenuItem value={date.toISOString()}>
                                {date.toLocaleTimeString()}
                            </MenuItem>
                        ))}
                    </Select>

                </FormControl>
                <FormControl sx={{ mt: 2 , minWidth: 100}}><InputLabel htmlFor="end">To</InputLabel>
                    <Select
                        value={end}
                        onChange={onEndChange}
                        label="end"
                    >
                        {endOptions.map((date: Date) => (
                            <MenuItem value={date.toISOString()}>
                                {date.toLocaleTimeString()}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <DialogContentText sx={{mt: 2}}>
                    Student: {studentUserName}
                </DialogContentText>
                <DialogContentText>
                    Instructor: {instructorUserName}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={onSubmit}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}