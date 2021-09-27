package com.pivottech.booking.controller;

import com.pivottech.booking.model.Reservation;
import com.pivottech.booking.service.BookingService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("reservations")
public class BookingController {

    final static int DEFAULT_PAGE_SIZE = 50;

    final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/")
    public List<Reservation> list(
            @RequestParam(name = "limit", required = false) int limit,
            @RequestParam(name = "terms", required = false) String searchTerms
    ) {
        Pageable pageable = PageRequest.ofSize(limit > 0 ? limit : DEFAULT_PAGE_SIZE);
        return bookingService.getReservations(pageable, searchTerms);
    }

    @GetMapping("/{id}")
    public Reservation getById(@PathVariable("id") long id) {
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