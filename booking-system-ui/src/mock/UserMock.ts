import { Role } from "../context/BookingSystemContext";

interface User {
    username: string,
    role: Role,
};

const userDirectory: {[key: string]: User} = {
    daitu: {
        username: 'daitu',
        role: 'Instructor',
    },
    zhuxun: {
        username: 'zhuxun',
        role: 'Instructor',
    },
    hxt: {
        username: 'hxt',
        role: 'Instructor',
    }, 
    xiangyu: {
        username: 'xiangyu',
        role: 'Student',
    }
};

export function getUser(username: string): User {
    const userFromDirectory = userDirectory[username];
    return userFromDirectory ?? {username: 'Unknown', role: 'Student'};
}