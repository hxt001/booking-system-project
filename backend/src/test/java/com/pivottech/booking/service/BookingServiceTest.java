package com.pivottech.booking.service;

import com.pivottech.booking.model.Reservation;
import org.joda.time.DateTime;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class BookingServiceTest {

    BookingService service;

    @BeforeEach
    void setUp() {
        service = new BookingService();
        service.createReservation(
                Reservation.builder()
                        .description("initial reservation")
                        .startTime(DateTime.now())
                        .endTime(DateTime.now().plusHours(1))
                        .build()
        );
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void createReservation() {
        int totalReservations = service.getReservations().size();
        service.createReservation(
                Reservation.builder()
                        .description("initial reservation")
                        .startTime(DateTime.now().plusHours(3))
                        .endTime(DateTime.now().plusHours(4))
                        .build()
        );
        assertEquals(totalReservations + 1, service.getReservations().size());
    }

    @Test
    void deleteReservation() {
        service.deleteReservation(0);
        assertEquals(0, service.getReservations().size());
    }

    @Test
    void getReservations() {
    }
}