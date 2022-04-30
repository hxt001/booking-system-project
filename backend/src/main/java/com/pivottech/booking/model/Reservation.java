package com.pivottech.booking.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "Reservation")
@Table(indexes = { @Index(name = "index_instructor_start_end", columnList = "utcStartTime, utcEndTime, student_id",
		unique = true) })
@Data
@Builder()
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Setter(AccessLevel.NONE)
	Long id;

	String description;

	@OneToMany(mappedBy = "reservation")
	@JsonManagedReference()
	List<Availability> availabilities;

	@NotNull
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	LocalDateTime utcStartTime;

	@NotNull
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	LocalDateTime utcEndTime;

	@ManyToOne
	@JoinColumn(name = "student_id")
	@NotNull
	Student student;

	@JsonGetter("studentUsername")
	public String getStudentUsername() {
		return this.student.user.username;
	}

	@JsonGetter("instructorUsername")
	public String getInstructorUsername() {
		return this.availabilities.stream().findFirst().get().instructor.user.username;
	}

}
