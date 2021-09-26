package com.pivottech.booking.controller;

import com.pivottech.booking.model.Reservation;
import com.pivottech.booking.service.BookingService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("reservations")
public class BookingController {

    final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/")
    public List<Reservation> list(@RequestParam(name="limit", value="10") int limit) {
        Pageable pageable = Pageable.ofSize(limit);
        return bookingService.getReservations(pageable);
    }

    @GetMapping("/{id}")
    public Reservation getById(@PathVariable("id")  long id) {
        Reservation resv = this.bookingService.getReservationById(id);
        if (resv == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return resv;
    }

    @PostMapping("/")
    public Reservation create(@Valid @RequestBody Reservation reservation) {
        this.bookingService.createReservation(reservation);
        return reservation;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") long id) {
        if (!this.bookingService.deleteReservation(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
