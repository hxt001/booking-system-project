import { Container } from "@mui/material";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import BookingCalendar from "../components/BookingCalendar";
import LoadingContainer from "../components/LoadingContainer";
import MyCalendar from "../components/MyCalendar";
import PTAppBar from "../components/PTAppBar";
import BookingSystemContext from "../context/BookingSystemContext";
import useUserCheck from "../hooks/useUserCheck";

export interface RouteParams {
    username: string,
}

export default function InstructorView(): React.ReactElement {
    const { username: viewerUserName } = useContext(BookingSystemContext);
    const { username: instructorUserName } = useParams<RouteParams>();
    
    const isLoading = useUserCheck(
        (parsedRes) => parsedRes?.instructor?.id == null
    );
    return (
        <>
            <PTAppBar />
            <Container sx={{ mt: 10 }}>
                <LoadingContainer isLoading={isLoading}>
                    {viewerUserName === instructorUserName ? <MyCalendar /> : <BookingCalendar />}
                </LoadingContainer>
            </Container>)
        </>
    );
}