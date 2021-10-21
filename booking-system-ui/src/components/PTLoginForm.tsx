import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useCallback, useContext, useState } from 'react';
import { getUser } from '../mock/UserMock';
import BookingSystemContext from '../context/BookingSystemContext';
import { useHistory } from 'react-router';

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
    const [userNameInput, setUserNameInput] = useState('');
    const onInputChange = useCallback((e) => {
        setUserNameInput(e.target.value);
    }, []);

    const { setUserName, setRole } = useContext(BookingSystemContext);
    const history = useHistory();
    const onSubmit = useCallback(() => {
        const mockedUser = getUser(userNameInput);

        // Setup Context
        setUserName(mockedUser.username);
        setRole(mockedUser.role);

        // Redirect User
        switch (mockedUser.role) {
            case 'Student':
                history.push(`/student/${mockedUser.username}`);
                break;
            case 'Instructor':
                history.push(`instructor/${mockedUser.username}`);
                break;
        }
    }, [history, setRole, setUserName, userNameInput]);
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