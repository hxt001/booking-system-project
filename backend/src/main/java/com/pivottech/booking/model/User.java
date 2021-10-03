package com.pivottech.booking.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity(name = "User")
@Data
@Table(indexes = {
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
    @JsonBackReference("user-instructor")
    Instructor instructor;

    @OneToOne(mappedBy = "user")
    @JsonBackReference("user-student")
    Student student;
}
