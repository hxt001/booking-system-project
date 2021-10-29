import { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import BookingSystemContext, { Role } from "../context/BookingSystemContext";

interface AuthenticationFormStates {
    isLoading: boolean,
    errorMessage: string | null,
    onRequestStart: () => void,
    onErrorMsgClose: () => void,
    onRequestFailed: () => void,
    onRequestSuccess: (response: any) => void,
}

const defaultErrorMessage = 'There has been an error processing your request';

export default function useAuthenticationForm(
    parseResponse: (request: any) => {username: string | null, role: Role | null}
): AuthenticationFormStates {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { setUserName, setRole } = useContext(BookingSystemContext);

    const onRequestStart = useCallback(() => {
        setIsLoading(true);
    }, []);
    const onErrorMsgClose = useCallback(() => {
        setErrorMessage(null);
    }, []);

    const onRequestFailed = useCallback(() => {
        setErrorMessage(defaultErrorMessage);
        setIsLoading(false);
    }, []);

    const history = useHistory();


    const onRequestSuccess = useCallback((response) => {
        setIsLoading(false);

        const {username, role} = parseResponse(response);
        if (username == null || role == null) {
            setErrorMessage(defaultErrorMessage);
            return;
        }

        setUserName(username);
        setRole(role);
        localStorage.setItem('username', username);

        switch (role) {
            case 'Student':
                history.push(`/student/${username}`);
                break;
            case 'Instructor':
                history.push(`instructor/${username}`);
                break;
        }
    }, [history, parseResponse, setRole, setUserName]);

    return {
        isLoading,
        errorMessage,
        onRequestStart,
        onErrorMsgClose,
        onRequestFailed,
        onRequestSuccess,
    }
}