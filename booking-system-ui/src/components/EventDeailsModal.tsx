import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Link } from "react-router-dom";
import { Event } from "../utils/CalendarUtils";

interface Props {
    reservation: Event | null,
    onClose: () => void,
}

export default function EventDetailsModal({
    reservation,
    onClose
}: Props): React.ReactElement {
    return (
        <Dialog fullWidth maxWidth='sm' open={reservation != null} onClose={onClose}>
            <DialogTitle>
                {reservation?.title}
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    Student:{reservation?.student}
                </DialogContentText>
                <DialogContentText>
                    Instructor: {<Link to={`/instructor/${reservation?.instructor}`}>{reservation?.instructor} </Link>}
                </DialogContentText>
                <DialogContentText>
                    From: {reservation?.start.toLocaleString()}
                </DialogContentText>
                <DialogContentText>
                    To: {reservation?.end.toLocaleString()}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Dismiss
                </Button>
            </DialogActions>
        </Dialog>
    );
}