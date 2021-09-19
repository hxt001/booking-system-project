
package com.pivottech.booking.controller;

import com.pivottech.booking.model.Classroom;
import com.pivottech.booking.model.Student;
import org.springframework.web.bind.annotation.*;
import java.time.LocalTime;
import java.util.List;

@RestController
public class StudentController {
    private Classroom classroom1 = new Classroom();
    @CrossOrigin(origins = "*")
    @GetMapping("/hellotime")
    public String greeting(@RequestParam(value = "name", defaultValue = "World") String name1,
                           @RequestParam(value = "age", defaultValue = "0") int age) {
        LocalTime lt = LocalTime.now();
        String ret = String.format("hello %s, age: %d, now is %s", name1, age, lt.toString());
        return ret;
    }
    @PostMapping(path = "/addStudent")
    public Student addMemberV1(@RequestBody Student student) {
        //code

        classroom1.addStudent(student);
        return student;
    }

    @PostMapping(path = "/deleteStudent")
    public Student deleteStudent(@RequestBody Student student) {
        //code

        classroom1.addStudent(student);
        return student;
    }
    @GetMapping(path = "/getStudentList")
    public List<Student> getStudent() {
        //code
        return classroom1.getStudentList();
    }

}
