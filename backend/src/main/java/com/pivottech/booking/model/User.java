package com.pivottech.booking.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity(name = "User")
@Data
@Table(name = "\"user\"",
        indexes = {
        @Index(name = "username_index", columnList = "username", unique = true)
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @NotEmpty
    @Column(nullable = false)
    String username;

    @OneToOne(mappedBy = "user")
    @JsonManagedReference("user-instructor")
    Instructor instructor;

    @OneToOne(mappedBy = "user")
    @JsonManagedReference("user-student")
    Student student;
}
