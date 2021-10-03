package com.pivottech.booking.repository;

import com.pivottech.booking.model.Instructor;
import org.springframework.data.repository.CrudRepository;

public interface InstructorRepository extends CrudRepository<Instructor, Long> {
}