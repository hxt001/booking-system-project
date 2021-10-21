import { Container } from "@mui/material";
import React from "react";
import PTAppBar from "../components/PTAppBar";
import PTSignUpForm from "../components/PTSignUpForm";

export default function SignUpView(): React.ReactElement {
    return (
        <>
            <PTAppBar />
            <Container sx={{ paddingTop: '5%' }}>
                <PTSignUpForm />
            </Container>
        </>
    );
}