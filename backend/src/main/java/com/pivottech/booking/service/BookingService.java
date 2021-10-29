package com.pivottech.booking.service;

import com.pivottech.booking.model.Availability;
import com.pivottech.booking.model.Instructor;
import com.pivottech.booking.model.Reservation;
import com.pivottech.booking.model.Student;
import com.pivottech.booking.repository.AvailabilityRepository;
import com.pivottech.booking.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    AvailabilityRepository availabilityRepository;

    @Transactional
    public Reservation createReservation(Student student, Availability availability, String description) {
        Reservation toBeCreated = Reservation.builder()
                .description(description)
                .student(student)
                .utcStartTime(availability.getUtcStartTime())
                .utcEndTime(availability.getUtcEndTime())
                .availabilities(List.of(availability))
                .build();
        Reservation saved = reservationRepository.save(toBeCreated);
        availability.setReservation(saved);
        availabilityRepository.save(availability);
        return saved;
    }

//    public boolean deleteReservation(Long id) {
//        Reservation toDelete = getReservationById(id);
//        if (toDelete == null) {
//            return false;
//        }
//        this.reservationRepository.delete(toDelete);
//        return true;
//    }

    public List<Reservation> getStudentReservationsBetween(Student student, LocalDateTime from, LocalDateTime to) {
        List<Reservation> results = reservationRepository.findByUsernameAndBetween(student.getId(), from, to);
        return results;
    }

    public List<Reservation> getInstructorReservationsBetween(Instructor instructor, LocalDateTime from, LocalDateTime to) {
        List<Reservation> results = reservationRepository.findByInstructorAndBetween(instructor.getId(), from, to);
        return results;
    }

    public Reservation getReservationById(Long id) {
        Optional<Reservation> resv = reservationRepository.findById(id);
        return resv.orElse(null);
    }

    public List<Availability> findAvailabilitiesBetween(Instructor instructor, LocalDateTime from, LocalDateTime to) {
        return availabilityRepository.findAvailableBetween(instructor, from, to);
    }

    public Availability getAvailabilityById(Long id) {
        return availabilityRepository.findById(id).orElse(null);
    }

    public Iterable<Availability> createAvailability(
            Instructor instructor,
            LocalDateTime fromUtc,
            LocalDateTime toUtc,
            Duration duration
    ) {
        List<Availability> toBeCreated = new ArrayList<>();
        LocalDateTime start = fromUtc, end = fromUtc.plus(duration);
        while (end.isBefore(toUtc) || end.isEqual(toUtc)) {
            toBeCreated.add(
                    Availability.builder()
                            .instructor(instructor)
                            .utcStartTime(start)
                            .utcEndTime(end)
                            .build()
            );
            start = end;
            end = start.plus(duration);
        }
        Iterable<Availability> saved = availabilityRepository.saveAll(toBeCreated);
        return saved;
    }

}
