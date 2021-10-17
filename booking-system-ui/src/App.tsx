import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import React from "react";
import LoginView from "./views/LoginView";
import StudentView from "./views/StudentView";
import InstructorView from "./views/InstructorView";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { BookingSystemContextProvider } from "./context/BookingSystemContext";

export default function App(): React.ReactElement {
  const theme = createTheme();
  return (
    <BookingSystemContextProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/student">
              <StudentView />
            </Route>
            <Route path="/instructor">
              <InstructorView />
            </Route>
            <Route path="/login">
              <LoginView />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </BookingSystemContextProvider>
  );
}