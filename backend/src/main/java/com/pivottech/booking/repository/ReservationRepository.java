package com.pivottech.booking.repository;

import com.pivottech.booking.model.Reservation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends PagingAndSortingRepository<Reservation, Long> {

    @Query(
            value = "SELECT r from Reservation r WHERE r.student.id = :student_id AND " +
                    "r.utcStartTime >= :from AND r.utcEndTime < :to"
    )
    List<Reservation> findByUsernameAndBetween(
            @Param("student_id") Long studentId,
            @Param("from") LocalDateTime from,
            @Param("to") LocalDateTime to
    );
}
