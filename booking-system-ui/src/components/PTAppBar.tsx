import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import BookingSystemContext from '../context/BookingSystemContext';
import iconImage from '../static/logo.png';

const styles = {
    nameText: {
        flexGrow: 1
    },
    iconImage: {
        width: '60px',
        height: '60px',
        marginRight: '20px',
    }
}

export default function PTAppBar(): React.ReactElement {
    const history = useHistory();
    const {username, role} = useContext(BookingSystemContext);
    const onLoginButtonClick = useCallback(() => {
        switch (role) {
            case 'Instructor':
                history.push('/instructor');
                break;
            case 'Student':
                history.push('/student');
                break;
            default:
                history.push('login');
        }
    }, [history, role]);
    const buttonText = username ?? 'Log in';
    
    return (
        <AppBar>
            <Toolbar>
                    <img src={iconImage} alt='Pivot Tech Logo' style={styles.iconImage} />
                    <Typography variant="h6" component="div" sx={styles.nameText}>
                        Pivot Tech Booking System
                    </Typography>
                <Button color="inherit" onClick={onLoginButtonClick}>{buttonText}</Button>
            </Toolbar>
        </AppBar>
    )

}