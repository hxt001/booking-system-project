package com.pivottech.booking.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "Student")
@Data
@ToString(exclude = { "user" })
@EqualsAndHashCode(exclude = { "user" })
public class Student implements Serializable {

	@Id
	@Setter(AccessLevel.NONE)
	Long id;

	@OneToOne(cascade = { CascadeType.ALL })
	@JoinColumn(name = "user_id")
	@MapsId
	@JsonBackReference("user-student")
	User user;

	String grade;

}
