import {  Container } from "@mui/material";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import BookingCalendar from "../components/BookingCalendar";
import MyCalendar from "../components/MyCalendar";
import PTAppBar from "../components/PTAppBar";
import BookingSystemContext from "../context/BookingSystemContext";

export interface RouteParams{
    username: string,
}

export default function InstructorView(): React.ReactElement {
    const {username: viewerUserName} = useContext(BookingSystemContext);
    const {username: instructorUserName} = useParams<RouteParams>();
    return (
        <>
            <PTAppBar />
            <Container sx={{mt: 10}}>
                {viewerUserName === instructorUserName ? <MyCalendar />: <BookingCalendar />}
            </Container>
        </>
    );
}