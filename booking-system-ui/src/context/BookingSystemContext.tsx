import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import BookingSystemRequest from "../utils/BookingSystemRequest";

export type Role = 'Student' | 'Instructor';

export interface BookingSystemContextInterface {
  username: string | null;
  role: Role | null;
  setUserName: (username: string | null) => void;
  setRole: (role: Role | null) => void;
}

const emptyFunction = () => { };
const emptyContext: BookingSystemContextInterface = {
  username: null,
  role: null,
  setUserName: emptyFunction,
  setRole: emptyFunction,
}
const BookingSystemContext: React.Context<BookingSystemContextInterface> = React.createContext(emptyContext);

interface Props {
  children: React.ReactElement;
}
export function BookingSystemContextProvider({
  children
}: Props): React.ReactElement {
  const [username, setUserName] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  // Fetch user information from local storage
  const onRequestSusccess = useCallback((response) => {
    if (!Boolean(response)) {
        return;
    }
    response = JSON.parse(response);

    const username = response.username;
    const role = response.instructor?.id != null ? 'Instructor' : 'Student';

    setUserName(username);
    setRole(role);
}, [setRole, setUserName]);

  useEffect(() => {
    const userFromStorage = localStorage.getItem('username');
    if (userFromStorage != null) {
      new BookingSystemRequest(`users/${userFromStorage}`, 'GET')
            .onSuccess(onRequestSusccess)
            .send();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const initialValue: BookingSystemContextInterface = { username, role, setUserName, setRole };

  return (
    <BookingSystemContext.Provider value={initialValue}>
      {children}
    </BookingSystemContext.Provider>
  );
}

export default BookingSystemContext;