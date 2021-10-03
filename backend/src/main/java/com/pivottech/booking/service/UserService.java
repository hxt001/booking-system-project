package com.pivottech.booking.service;

import com.pivottech.booking.model.Instructor;
import com.pivottech.booking.model.Student;
import com.pivottech.booking.model.User;
import com.pivottech.booking.repository.InstructorRepository;
import com.pivottech.booking.repository.StudentRepository;
import com.pivottech.booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    InstructorRepository instructorRepository;

    public User createUser(User user) {
        userRepository.save(user);
        return user;
    }

    public User getUserByUsername(String username) {
        return userRepository.getByUsername(username);
    }

    public Student updateStudentProfile(String username, Student student) {
        User user = getUserByUsername(username);
        if (user.getStudent() == null) {
            student.setUser(user);
            studentRepository.save(student);
            return student;
        }
        Student existing = user.getStudent();
        existing.setGrade(student.getGrade());
        userRepository.save(user);
        return existing;
    }

    public Instructor updateStudentProfile(String username, Instructor instructor) {
        User user = getUserByUsername(username);
        if (user.getInstructor() == null) {
            instructor.setUser(user);
            instructorRepository.save(instructor);
            return instructor;
        }
        Instructor existing = user.getInstructor();
        existing.setIntroduction(instructor.getIntroduction());
        userRepository.save(user);
        return existing;
    }

}
