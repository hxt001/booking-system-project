import { Avatar, Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useCallback, useContext, useState } from 'react';
import { getUser } from '../mock/UserMock';
import BookingSystemContext, { Role } from '../context/BookingSystemContext';
import { useHistory } from 'react-router';
import { AccountCircleOutlined } from '@mui/icons-material';

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
    const [tab, setTab] = useState('Student');

    const [userNameInput, setUserNameInput] = useState('');
    const [gradeInput, setGradeInput] = useState('1');
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

    const { setUserName, setRole } = useContext(BookingSystemContext);
    const history = useHistory();
    const onSubmit = useCallback(() => {
        const mockedUser = getUser(userNameInput);

        // Setup Context
        setUserName(mockedUser.username);
        setRole(tab as Role);

        // Redirect User
        switch (tab) {
            case 'Student':
                history.push(`/student/${mockedUser.username}`);
                break;
            case 'Instructor':
                history.push(`instructor/${mockedUser.username}`);
                break;
        }
    }, [history, setRole, setUserName, tab, userNameInput]);

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
                                <MenuItem value={1}>Freshman</MenuItem>
                                <MenuItem value={2}>Sophoremore</MenuItem>
                                <MenuItem value={3}>Junior</MenuItem>
                                <MenuItem value={4}>Senior</MenuItem>
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