package com.pivottech.booking.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "Student")
@Data
public class Student {

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
