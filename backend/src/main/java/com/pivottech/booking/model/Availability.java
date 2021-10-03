package com.pivottech.booking.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity(name = "Availability")
@Table(indexes = {
        @Index(
                name="index_instructor_start_end",
                columnList = "utcStartTime, utcEndTime, instructor_id",
                unique = true
        )
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Availability {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Setter(AccessLevel.NONE)
    Long id;

    @NotNull
    LocalDateTime utcStartTime;

    @NotNull
    LocalDateTime utcEndTime;

    @ManyToOne
    @JoinColumn(name = "instructor_id")
    @NotNull
    Instructor instructor;

    @ManyToOne
    @JoinColumn(name = "reservation_id")
    @JsonBackReference
    Reservation reservation;

    @Version
    @Setter(AccessLevel.NONE)
    Integer version;
}
