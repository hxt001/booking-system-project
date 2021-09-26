package com.pivottech.booking.service;

import com.pivottech.booking.model.Reservation;
import com.pivottech.booking.repository.ReservationRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    final static int DEFAULT_PAGE_SIZE = 50;

    private final ReservationRepository reservations;

    public BookingService(ReservationRepository reservations) {
        this.reservations = reservations;
    }

    public Reservation createReservation(Reservation reservation) {
        Reservation saved = this.reservations.save(reservation);
        return saved;
    }

    public boolean deleteReservation(Long id) {
        Reservation toDelete = getReservationById(id);
        if (toDelete == null) {
            return false;
        }
        this.reservations.delete(toDelete);
        return true;
    }

    public List<Reservation> getReservations() {
        return getReservations(Pageable.ofSize(DEFAULT_PAGE_SIZE));
    }

    public List<Reservation> getReservations(Pageable pageable) {
        Page<Reservation> page = this.reservations.findAll(pageable);
        return page.toList();
    }

    public Reservation getReservationById(Long id) {
        Optional<Reservation> resv = reservations.findById(id);
        return resv.orElse(null);
    }
}
