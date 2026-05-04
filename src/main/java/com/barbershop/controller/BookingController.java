package com.barbershop.controller;

import com.barbershop.model.Booking;
import com.barbershop.model.BookingStatus;
import com.barbershop.service.BookingManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingController {

    @Autowired
    private BookingManager bookingManager;

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        try {
            List<Booking> bookings = bookingManager.getAllBookings();
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        try {
            if (id == null || id <= 0) {
                return ResponseEntity.badRequest().build();
            }
            Optional<Booking> booking = bookingManager.getBookingById(id);
            return booking.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@Valid @RequestBody Booking booking) {
        try {
            // Validate booking data
            Map<String, String> errors = validateBooking(booking);
            if (!errors.isEmpty()) {
                return ResponseEntity.badRequest().body(errors);
            }

            // Check if time slot is available
            if (!bookingManager.isTimeSlotAvailable(booking.getDateTime(), booking.getBarberName())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Time slot is not available for this barber");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
            }

            // Check if booking time is in the future
            if (booking.getDateTime().isBefore(LocalDateTime.now())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Booking time must be in the future");
                return ResponseEntity.badRequest().body(error);
            }

            Booking createdBooking = bookingManager.createBooking(booking);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdBooking);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to create booking: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long id, @RequestBody Map<String, String> statusMap) {
        try {
            if (id == null || id <= 0) {
                return ResponseEntity.badRequest().build();
            }
            
            String status = statusMap.get("status");
            if (status == null || status.trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Status is required");
                return ResponseEntity.badRequest().body(error);
            }

            try {
                BookingStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Invalid status. Must be one of: PENDING, CONFIRMED, CANCELLED, COMPLETED");
                return ResponseEntity.badRequest().body(error);
            }

            Booking updatedBooking = bookingManager.updateBookingStatus(id, status.toUpperCase());
            if (updatedBooking != null) {
                return ResponseEntity.ok(updatedBooking);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to update booking status: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        try {
            if (id == null || id <= 0) {
                return ResponseEntity.badRequest().build();
            }
            
            Optional<Booking> booking = bookingManager.getBookingById(id);
            if (!booking.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            bookingManager.deleteBooking(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Booking deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to delete booking: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Booking>> getBookingsByStatus(@PathVariable String status) {
        try {
            if (status == null || status.trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            
            try {
                BookingStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().build();
            }
            
            List<Booking> bookings = bookingManager.getBookingsByStatus(status.toUpperCase());
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/barber/{barberName}")
    public ResponseEntity<List<Booking>> getBookingsByBarber(@PathVariable String barberName) {
        try {
            if (barberName == null || barberName.trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            
            List<Booking> bookings = bookingManager.getBookingsByBarber(barberName);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/available/{dateTime}/{barberName}")
    public ResponseEntity<Map<String, Boolean>> checkTimeSlotAvailability(
            @PathVariable String dateTime, 
            @PathVariable String barberName) {
        try {
            if (dateTime == null || dateTime.trim().isEmpty() || barberName == null || barberName.trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            
            LocalDateTime bookingTime = LocalDateTime.parse(dateTime);
            boolean isAvailable = bookingManager.isTimeSlotAvailable(bookingTime, barberName);
            
            Map<String, Boolean> response = new HashMap<>();
            response.put("available", isAvailable);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private Map<String, String> validateBooking(Booking booking) {
        Map<String, String> errors = new HashMap<>();
        
        if (booking.getName() == null || booking.getName().trim().isEmpty()) {
            errors.put("name", "Name is required");
        } else if (booking.getName().length() < 2 || booking.getName().length() > 100) {
            errors.put("name", "Name must be between 2 and 100 characters");
        }
        
        if (booking.getPhone() == null || booking.getPhone().trim().isEmpty()) {
            errors.put("phone", "Phone number is required");
        } else if (!booking.getPhone().matches("\\d{10}")) {
            errors.put("phone", "Phone number must be 10 digits");
        }
        
        if (booking.getServiceName() == null || booking.getServiceName().trim().isEmpty()) {
            errors.put("serviceName", "Service name is required");
        }
        
        if (booking.getBarberName() == null || booking.getBarberName().trim().isEmpty()) {
            errors.put("barberName", "Barber name is required");
        }
        
        if (booking.getDateTime() == null) {
            errors.put("dateTime", "Date and time is required");
        }
        
        return errors;
    }
}
