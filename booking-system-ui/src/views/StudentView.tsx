import { Typography } from "@mui/material";
import React, { useContext } from "react";
import PTAppBar from "../components/PTAppBar";
import BookingSystemContext from "../context/BookingSystemContext";

export default function StudentView(): React.ReactElement {
    const {username} = useContext(BookingSystemContext);
    return (
        <>
            <PTAppBar />
            <Typography sx={{mt: 8}} variant='h4'>
                Student View: {username}
            </Typography>
        </>
    );
}