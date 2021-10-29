import { Alert, Avatar, Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { AccountCircleOutlined } from '@mui/icons-material';
import useAuthenticationForm from '../hooks/useAuthenticationForm';
import BookingSystemRequest from '../utils/BookingSystemRequest';
import { Role } from '../context/BookingSystemContext';

const styles = {
    accountIcon: {
        margin: 1,
        bgcolor: 'secondary.main'
    },
    button: {
        marginTop: 3,
        matginBottom: 2,
    },
    form: {
        marginTop: 1,
    },
    title: {
        marginBottom: 2,
    },
    grade: {
        marginTop: 2,
    },
    tabGroup: {
        borderBottom: 1,
        borderColor: 'divider',
    }
}

export default function PTSignUpForm(): React.ReactElement {
    // Input states
    const [tab, setTab] = useState('Student');
    const [userNameInput, setUserNameInput] = useState('');
    const [gradeInput, setGradeInput] = useState('Freshman');
    const [introduction, setIntroduction] = useState('');

    const onUserNameChange = useCallback((e) => {
        setUserNameInput(e.target.value);
    }, []);
    const onTabChange = useCallback((_, newValue) => {
        setTab(newValue);
    }, []);
    const onGradeChange = useCallback((e) => {
        setGradeInput(e.target.value);
    }, []);
    const onIntroChange = useCallback((e) => {
        setIntroduction(e.target.value);
    }, []);

    // Request Handling
    const {
        isLoading,
        errorMessage,
        onRequestStart,
        onErrorMsgClose,
        onRequestFailed,
        onRequestSuccess,
    } = useAuthenticationForm(() => {
        return {
            username: userNameInput,
            role: tab as Role,
        };
    });

    const onUserCreationSuccess = useCallback(() => {
        const isStudent = tab === 'Student';
        const path = isStudent ? 'students' : 'instructors';
        const payload = isStudent ? {grade: gradeInput} : {introduction: introduction}
        new BookingSystemRequest(`${path}/${userNameInput}`, 'POST')
            .setPayload(payload)
            .onSuccess(onRequestSuccess)
            .onFailure(onRequestFailed)
            .onError(onRequestFailed)
            .send();
    }, [gradeInput, introduction, onRequestFailed, onRequestSuccess, tab, userNameInput]);

    const onSubmit = useCallback((e) => {
        new BookingSystemRequest(`users`, 'POST')
            .setPayload({ username: userNameInput })
            .onStart(onRequestStart)
            .onSuccess(onUserCreationSuccess)
            .onFailure(onRequestFailed)
            .onError(onRequestFailed)
            .send();
        e.preventDefault();
    }, [onRequestFailed, onRequestStart, onUserCreationSuccess, userNameInput]);

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Avatar sx={styles.accountIcon}>
                    <AccountCircleOutlined />
                </Avatar>
                <Typography sx={styles.title} component="h1" variant="h4">
                    Sign Up
                </Typography>
                {isLoading && <CircularProgress sx={{ mt: 2 }} />}
                {errorMessage != null && (
                    <Alert onClose={onErrorMsgClose} severity="error" sx={{ mt: 2 }}>
                        {errorMessage}
                    </Alert>
                )}
                <Box sx={styles.tabGroup}>
                    <Tabs value={tab} onChange={onTabChange}>
                        <Tab tabIndex={0} value='Student' label="Student" />
                        <Tab tabIndex={1} value='Instructor' label="Instructor" />
                    </Tabs>
                </Box>
                <Box component="form" onSubmit={onSubmit} sx={styles.form}>
                    <TextField
                        margin="normal"
                        fullWidth
                        required
                        id="username"
                        label="User Name"
                        name="username"
                        autoComplete="username"
                        onChange={onUserNameChange}
                        autoFocus
                    />
                    {tab === 'Instructor' && (<TextField
                        margin="normal"
                        fullWidth
                        id="intro"
                        label="Introduction"
                        name="Introduction"
                        onChange={onIntroChange}
                    />)}
                    {tab === 'Student' && (
                        <FormControl sx={styles.grade} fullWidth>
                            <InputLabel id="grade-label">Grade</InputLabel>
                            <Select
                                labelId='grade-label'
                                id="grade"
                                fullWidth
                                label="Grade"
                                value={gradeInput}
                                onChange={onGradeChange}
                            >
                                <MenuItem value={'Freshman'}>Freshman</MenuItem>
                                <MenuItem value={'Sophoremore'}>Sophoremore</MenuItem>
                                <MenuItem value={'Junior'}>Junior</MenuItem>
                                <MenuItem value={'Senior'}>Senior</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                    <Button
                        type="submit"
                        sx={styles.button}
                        fullWidth
                        variant="contained"
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}