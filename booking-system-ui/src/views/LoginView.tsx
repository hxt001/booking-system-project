import { Container } from "@mui/material";
import React from "react";
import PTAppBar from "../components/PTAppBar";
import PTLoginForm from "../components/PTLoginForm";

export default function LoginView(): React.ReactElement {
    return (
        <>
            <PTAppBar />
            <Container sx={{ paddingTop: '5%' }}>
                <PTLoginForm />
            </Container>
        </>
    );
}