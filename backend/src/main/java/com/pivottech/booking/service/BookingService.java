package com.pivottech.booking.service;

import com.pivottech.booking.model.Reservation;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        Optional<Reservation> toDelete = this.reservations.stream().filter(r -> r.getId().equals(id)).findFirst();
        if (toDelete.isEmpty()) {
            return false;
        }
        this.reservations.remove(toDelete.get());
        return true;
    }

    public List<Reservation> getReservations() {
        return this.reservations;
    }
}
