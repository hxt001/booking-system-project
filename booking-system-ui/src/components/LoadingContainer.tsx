import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import BookingSystemContext from "../context/BookingSystemContext";

export default function LoadingContainer({
    isLoading,
    children
}: {
    isLoading: boolean
    children: React.ReactNode
}): React.ReactElement {
    const { username, role } = useContext(BookingSystemContext);

    const isFetchingFromLocalStorage = username != null && role == null;

    return <>{
        isFetchingFromLocalStorage || isLoading ?
            <CircularProgress /> : children
    }</>;
}