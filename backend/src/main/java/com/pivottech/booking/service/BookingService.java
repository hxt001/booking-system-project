package com.pivottech.booking.service;

import com.pivottech.booking.model.Reservation;
import com.pivottech.booking.repository.ReservationRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

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

    public List<Reservation> getReservations(Pageable pageable, String terms) {
        Page<Reservation> page = StringUtils.isBlank(terms) ?
                this.reservations.findAll(pageable) :
                this.reservations.findByDescriptionContaining(terms, pageable);
        return page.toList();
    }

    public Reservation getReservationById(Long id) {
        Optional<Reservation> resv = reservations.findById(id);
        return resv.orElse(null);
    }
}
