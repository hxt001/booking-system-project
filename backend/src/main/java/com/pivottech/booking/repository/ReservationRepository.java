package com.pivottech.booking.repository;

import com.pivottech.booking.model.Reservation;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ReservationRepository extends PagingAndSortingRepository<Reservation, Long> {
}
