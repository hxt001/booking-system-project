import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface Props {
    errorMsg: string | null,
    onClose: () => void,
}

export default function ErrorModal({
    errorMsg,
    onClose
}: Props): React.ReactElement {
    return (
        <Dialog fullWidth maxWidth='sm' open={errorMsg != null} onClose={onClose}>
            <DialogTitle>Error</DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    {errorMsg}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}