import { Container } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import MyCalendar from "../components/MyCalendar";
import PTAppBar from "../components/PTAppBar";
import BookingSystemContext from "../context/BookingSystemContext";
import { RouteParams } from "./InstructorView";

export default function StudentView(): React.ReactElement {
    const {username: viewerUserName} = useContext(BookingSystemContext);
    const {username: studentUserName} = useParams<RouteParams>();
    const history = useHistory();

    useEffect(() => {
        // Only student themselves can see this page
        if (studentUserName !== viewerUserName){
            history.push('/');
        }
    }, [history, studentUserName, viewerUserName]);

    return (
        <>
            <PTAppBar />
            <Container sx={{mt: 10}}>
                <MyCalendar />
            </Container>
        </>
    );
}