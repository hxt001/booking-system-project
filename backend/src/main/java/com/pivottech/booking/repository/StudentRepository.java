package com.pivottech.booking.repository;

import com.pivottech.booking.model.Student;
import org.springframework.data.repository.CrudRepository;

public interface StudentRepository extends CrudRepository<Student, Long> {
}