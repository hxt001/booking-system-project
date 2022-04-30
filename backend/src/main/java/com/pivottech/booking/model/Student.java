package com.pivottech.booking.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "Student")
@Data
@ToString(exclude = { "user" })
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
