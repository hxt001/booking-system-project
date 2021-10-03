package com.pivottech.booking.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "Instructor")
@Data
public class Instructor {

    @Id
    @Setter(AccessLevel.NONE)
    Long id;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "user_id")
    @MapsId
    @JsonManagedReference("user-instructor")
    User user;

    String introduction;
}
