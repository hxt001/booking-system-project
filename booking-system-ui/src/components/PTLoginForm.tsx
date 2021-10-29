import { Alert, Avatar, Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BookingSystemRequest from '../utils/BookingSystemRequest';
import useAuthenticationForm from '../hooks/useAuthenticationForm';
import { Role } from '../context/BookingSystemContext';

const styles = {
    lockIcon: {
        margin: 1,
        bgcolor: 'secondary.main'
    },
    button: {
        marginTop: 3,
        matginBottom: 2,
    },
    form: {
        marginTop: 1,
    }
}

export default function PTLoginForm(): React.ReactElement {
    // Input states
    const [userNameInput, setUserNameInput] = useState('');
    const onInputChange = useCallback((e) => {
        setUserNameInput(e.target.value);
    }, []);

    const parseRequest = useCallback((response) => {
        if (!Boolean(response)) {
            return {
                username: null,
                role: null,
            };
        }
        const parsedResponse = JSON.parse(response);
        return {
            username: parsedResponse.username,
            role: (parsedResponse.student?.id != null ? 'Student' : 'Instructor') as Role,
        };
    }, []);

    // Request Handling
    const {
        isLoading,
        errorMessage,
        onRequestStart,
        onErrorMsgClose,
        onRequestFailed,
        onRequestSuccess,
    } = useAuthenticationForm(parseRequest);

    const onSubmit = useCallback((e) => {
        new BookingSystemRequest(`users/${userNameInput}`, 'GET')
            .onStart(onRequestStart)
            .onSuccess(onRequestSuccess)
            .onFailure(onRequestFailed)
            .onError(onRequestFailed)
            .send();

        e.preventDefault();
    }, [onRequestFailed, onRequestStart, onRequestSuccess, userNameInput]);

    const history = useHistory();
    const onSignUpButtonClicked = useCallback(() => {
        history.push(`/signup`);
    }, [history]);

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Avatar sx={styles.lockIcon}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h4">
                    Log in
                </Typography>
                {isLoading && <CircularProgress sx={{ mt: 2 }} />}
                {errorMessage != null && (
                    <Alert onClose={onErrorMsgClose} severity="error" sx={{ mt: 2 }}>
                        {errorMessage}
                    </Alert>
                )}
                <Box component="form" onSubmit={onSubmit} sx={styles.form}>
                    <TextField
                        margin="normal"
                        fullWidth
                        required
                        id="username"
                        label="User Name"
                        name="username"
                        autoComplete="username"
                        onChange={onInputChange}
                        autoFocus
                    />
                    <Button
                        type="submit"
                        sx={styles.button}
                        fullWidth
                        variant="contained"
                    >
                        Log In
                    </Button>
                    <Button
                        sx={styles.button}
                        fullWidth
                        variant="contained"
                        onClick={onSignUpButtonClicked}
                    >
                        Don't have an account? Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    )

}