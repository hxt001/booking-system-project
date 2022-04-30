package com.pivottech.booking.service;

import com.pivottech.booking.model.Reservation;
import com.pivottech.booking.repository.ReservationRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BookingServiceTest {

	@Mock
	ReservationRepository mockReservationRepository;

	BookingService service;

	static final Reservation mockReservation = Reservation.builder().id(1000L).description("initial reservation")
			.build();

	@BeforeEach
	void setUp() {
		service = new BookingService();
		when(mockReservationRepository.findById(mockReservation.getId())).thenReturn(Optional.of(mockReservation));
	}

	@AfterEach
	void tearDown() {
		Mockito.reset(mockReservationRepository);
	}

	@Test
	void createReservation() {
		var toBeCreated = Reservation.builder().description("initial reservation").build();
		// service.createReservation(toBeCreated);
		// verify(mockReservationRepository).save(toBeCreated);
	}

	// @Test
	// void deleteReservation() {
	// service.deleteReservation(mockReservation.getId());
	// verify(mockReservationRepository).delete(mockReservation);
	// }

	@Test
	void getReservations() {
	}

}