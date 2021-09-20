package com.pivottech.booking.service;

import com.pivottech.booking.model.Reservation;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final List<Reservation> reservations;

    public BookingService() {
        this.reservations = new ArrayList<>();
    }

    public void createReservation(Reservation reservation) {
        this.reservations.add(reservation);
    }

    public boolean deleteReservation(Integer id) {
        Reservation toDelete = getReservationById(id);
        if (toDelete == null) {
            return false;
        }
        this.reservations.remove(toDelete);
        return true;
    }

    public List<Reservation> getReservations(int limit) {
        return this.reservations.stream().limit(limit).collect(Collectors.toList());
    }

    public Reservation getReservationById(Integer id) {
        Optional<Reservation> resv = this.reservations.stream().filter(r -> r.getId().equals(id)).findFirst();
        return resv.orElse(null);
    }
}
