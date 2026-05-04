package com.barbershop.service;

import com.barbershop.model.Booking;
import com.barbershop.model.BookingStatus;
import com.barbershop.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;
import java.util.logging.Level;

@Component
public class BookingManager {

    private static final Logger logger = Logger.getLogger(BookingManager.class.getName());

    @Autowired
    private BookingRepository bookingRepository;

    // ================= GET ALL =================
    public List<Booking> getAllBookings() {
        try {
            logger.info("Fetching all bookings");
            List<Booking> bookings = bookingRepository.findAll();
            logger.info("Successfully fetched " + bookings.size() + " bookings");
            return bookings;
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error fetching all bookings", e);
            throw new RuntimeException("Failed to fetch bookings", e);
        }
    }

    // ================= GET BY ID =================
    public Optional<Booking> getBookingById(Long id) {
        try {
            if (id == null || id <= 0) {
                logger.warning("Invalid booking ID provided: " + id);
                return Optional.empty();
            }

            logger.info("Fetching booking with ID: " + id);
            Optional<Booking> booking = bookingRepository.findById(id);

            if (booking.isPresent()) {
                logger.info("Successfully found booking with ID: " + id);
            } else {
                logger.warning("Booking not found with ID: " + id);
            }

            return booking;
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error fetching booking with ID: " + id, e);
            throw new RuntimeException("Failed to fetch booking", e);
        }
    }

    // ================= CREATE =================
    public Booking createBooking(Booking booking) {
        try {
            if (booking == null) {
                throw new IllegalArgumentException("Booking cannot be null");
            }

            logger.info("Creating booking for: " + booking.getName());

            validateBookingForCreation(booking);

            Booking savedBooking = bookingRepository.save(booking);

            logger.info("Booking created with ID: " + savedBooking.getId());

            return savedBooking;

        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error creating booking", e);
            throw new RuntimeException("Failed to create booking", e);
        }
    }

    // ================= UPDATE STATUS (🔥 FIXED) =================
    public Booking updateBookingStatus(Long id, String status) {
        try {
            if (id == null || id <= 0) {
                throw new IllegalArgumentException("Invalid booking ID");
            }

            if (status == null || status.trim().isEmpty()) {
                throw new IllegalArgumentException("Status cannot be empty");
            }

            logger.info("Updating booking status for ID: " + id + " to: " + status);

            Optional<Booking> bookingOpt = bookingRepository.findById(id);

            if (bookingOpt.isEmpty()) {
                throw new RuntimeException("Booking not found");
            }

            Booking booking = bookingOpt.get();

            // 🔥 SAFE ENUM CONVERSION
            BookingStatus newStatus;
            try {
                newStatus = BookingStatus.valueOf(status.trim().toUpperCase());
            } catch (Exception e) {
                throw new RuntimeException("Invalid status: " + status);
            }

            // 🔥 DIRECT UPDATE (NO VALIDATION BLOCK)
            booking.setStatus(newStatus);

            Booking updated = bookingRepository.save(booking);

            logger.info("Status updated successfully for ID: " + id);

            return updated;

        } catch (Exception e) {
            logger.log(Level.SEVERE, "REAL ERROR:", e);
            throw new RuntimeException(e.getMessage());
        }
    }

    // ================= DELETE =================
    public void deleteBooking(Long id) {
        try {
            if (id == null || id <= 0) {
                throw new IllegalArgumentException("Invalid booking ID");
            }

            Optional<Booking> booking = bookingRepository.findById(id);

            if (booking.isEmpty()) {
                throw new RuntimeException("Booking not found");
            }

            validateBookingForDeletion(booking.get());

            bookingRepository.deleteById(id);

            logger.info("Deleted booking ID: " + id);

        } catch (Exception e) {
            logger.log(Level.SEVERE, "Delete error", e);
            throw new RuntimeException("Delete failed", e);
        }
    }

    // ================= FILTER =================
    public List<Booking> getBookingsByStatus(String status) {
        return bookingRepository.findByStatus(status.toUpperCase());
    }

    public List<Booking> getBookingsByBarber(String barberName) {
        return bookingRepository.findByBarberName(barberName);
    }

    // ================= SLOT CHECK =================
    public boolean isTimeSlotAvailable(LocalDateTime dateTime, String barberName) {
        return !bookingRepository.existsByDateTimeAndBarberAndNotCancelled(dateTime, barberName);
    }

    // ================= VALIDATIONS =================
    private void validateBookingForCreation(Booking booking) {
        if (booking.getDateTime().isBefore(LocalDateTime.now().plusHours(1))) {
            throw new IllegalArgumentException("Booking must be at least 1 hour in advance");
        }

        if (!isTimeSlotAvailable(booking.getDateTime(), booking.getBarberName())) {
            throw new IllegalArgumentException("Time slot is not available");
        }
    }

    private void validateBookingForDeletion(Booking booking) {
        if (booking.getDateTime().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Cannot delete past bookings");
        }

        if (booking.getStatus() == BookingStatus.COMPLETED) {
            throw new IllegalArgumentException("Cannot delete completed booking");
        }
    }
}