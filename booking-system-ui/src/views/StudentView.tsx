import { Container } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import LoadingContainer from "../components/LoadingContainer";
import MyCalendar from "../components/MyCalendar";
import PTAppBar from "../components/PTAppBar";
import BookingSystemContext from "../context/BookingSystemContext";
import useUserCheck from "../hooks/useUserCheck";
import { RouteParams } from "./InstructorView";

export default function StudentView(): React.ReactElement {
    const {username: viewerUserName, role} = useContext(BookingSystemContext);
    const {username: studentUserName} = useParams<RouteParams>();
    const history = useHistory();

    const isLoading = useUserCheck(
        (parsedRes) => parsedRes?.student?.id == null
    );

    useEffect(() => {
        // Only student themselves can see this page
        if (studentUserName !== viewerUserName && role != null){
            history.push('/');
        }
    }, [history, role, studentUserName, viewerUserName]);

    useEffect(() => {

    }, []);

    return (
        <>
            <PTAppBar />
            <Container sx={{mt: 10}}>
                <LoadingContainer isLoading={isLoading}>
                    <MyCalendar />
                </LoadingContainer>
            </Container>
        </>
    );
}