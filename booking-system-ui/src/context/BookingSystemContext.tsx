import * as React from "react";
import { useState } from "react";

export type Role = 'Student' | 'Instructor';

export interface BookingSystemContextInterface {
  username: string | null;
  role: Role | null;
  setUserName: (username: string) => void;
  setRole: (role: Role) => void;
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
  const initialValue: BookingSystemContextInterface = { username, role, setUserName, setRole };

  return (
    <BookingSystemContext.Provider value={initialValue}>
      {children}
    </BookingSystemContext.Provider>
  );
}

export default BookingSystemContext;