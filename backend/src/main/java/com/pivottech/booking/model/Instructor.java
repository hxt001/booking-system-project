package com.pivottech.booking.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "Instructor")
@Data
@ToString(exclude = { "user" })
@EqualsAndHashCode(exclude = { "user" })
public class Instructor implements Serializable {

	@Id
	@Setter(AccessLevel.NONE)
	Long id;

	@OneToOne(cascade = { CascadeType.ALL })
	@JoinColumn(name = "user_id")
	@MapsId
	@JsonBackReference("user-instructor")
	User user;

	String introduction;

}
