package com.pivottech.booking.model;

import java.util.ArrayList;
import java.util.List;

public class Classroom {
    private List<Student> studentList = new ArrayList<>();
    public void addStudent(Student student) {
        studentList.add(student);
    }
    public List<Student> getStudentList() {
        return studentList;
    }
}
