package com.pivottech.booking.controller;

import com.pivottech.booking.model.Reservation;
import com.pivottech.booking.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("reservations")
public class BookingController {

    final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/")
    public List<Reservation> list() {
        return bookingService.getReservations();
    }

    @PostMapping("/")
    public Reservation create(@RequestBody Reservation reservation) {
        this.bookingService.createReservation(reservation);
        return reservation;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        if (!this.bookingService.deleteReservation(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
