package com.barbershop.controller;

import com.barbershop.model.Booking;
import com.barbershop.model.Barber;
import com.barbershop.model.ShopService;
import com.barbershop.model.TimeSlot;
import com.barbershop.repository.BarberRepository;
import com.barbershop.repository.BookingRepository;
import com.barbershop.repository.ShopServiceRepository;
import com.barbershop.repository.TimeSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import java.util.logging.Level;

@RestController
@RequestMapping("/api/database")
@CrossOrigin("*")
public class DatabaseController {

    private static final Logger logger = Logger.getLogger(DatabaseController.class.getName());

    @Autowired
    private BarberRepository barberRepository;

    @Autowired
    private ShopServiceRepository shopServiceRepository;

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getDatabaseStatus() {
        try {
            Map<String, Object> status = new HashMap<>();
            
            // Get counts for each table
            long barberCount = barberRepository.count();
            long serviceCount = shopServiceRepository.count();
            long timeSlotCount = timeSlotRepository.count();
            long bookingCount = bookingRepository.count();
            
            status.put("database", "barberdb");
            status.put("status", "Connected");
            status.put("timestamp", java.time.LocalDateTime.now());
            
            Map<String, Object> tableCounts = new HashMap<>();
            tableCounts.put("barbers", barberCount);
            tableCounts.put("services", serviceCount);
            tableCounts.put("timeSlots", timeSlotCount);
            tableCounts.put("bookings", bookingCount);
            
            status.put("tableCounts", tableCounts);
            
            // Check if data is initialized
            boolean dataInitialized = barberCount > 0 && serviceCount > 0 && timeSlotCount > 0;
            status.put("dataInitialized", dataInitialized);
            
            if (!dataInitialized) {
                status.put("message", "Database tables exist but data not initialized. Start the backend application to initialize data.");
            } else {
                status.put("message", "Database is properly initialized with sample data.");
            }
            
            return ResponseEntity.ok(status);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error checking database status", e);
            Map<String, Object> error = new HashMap<>();
            error.put("status", "Error");
            error.put("message", "Failed to connect to database: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    @GetMapping("/barbers")
    public ResponseEntity<List<Barber>> getAllBarbers() {
        try {
            List<Barber> barbers = barberRepository.findAll();
            logger.info("Found " + barbers.size() + " barbers in database");
            return ResponseEntity.ok(barbers);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error fetching barbers", e);
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/services")
    public ResponseEntity<List<ShopService>> getAllServices() {
        try {
            List<ShopService> services = shopServiceRepository.findAll();
            logger.info("Found " + services.size() + " services in database");
            return ResponseEntity.ok(services);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error fetching services", e);
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/timeslots")
    public ResponseEntity<List<TimeSlot>> getAllTimeSlots() {
        try {
            List<TimeSlot> timeSlots = timeSlotRepository.findAll();
            logger.info("Found " + timeSlots.size() + " time slots in database");
            return ResponseEntity.ok(timeSlots);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error fetching time slots", e);
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        try {
            List<Booking> bookings = bookingRepository.findAll();
            logger.info("Found " + bookings.size() + " bookings in database");
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error fetching bookings", e);
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/timeslots/available")
    public ResponseEntity<List<TimeSlot>> getAvailableTimeSlots() {
        try {
            List<TimeSlot> allSlots = timeSlotRepository.findAll();
            List<TimeSlot> availableSlots = allSlots.stream()
                .filter(TimeSlot::getAvailable)
                .toList();
            logger.info("Found " + availableSlots.size() + " available time slots");
            return ResponseEntity.ok(availableSlots);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error fetching available time slots", e);
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/initialize")
    public ResponseEntity<Map<String, String>> initializeData() {
        try {
            // This would trigger data initialization if needed
            Map<String, String> response = new HashMap<>();
            response.put("message", "Data initialization is automatic on application startup. Please restart the backend application.");
            response.put("status", "Data will be initialized if tables are empty");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error during data initialization", e);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to initialize data: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    @GetMapping("/tables")
    public ResponseEntity<Map<String, Object>> getTableInfo() {
        try {
            Map<String, Object> tableInfo = new HashMap<>();
            
            // Barber table info
            List<Barber> barbers = barberRepository.findAll();
            Map<String, Object> barberInfo = new HashMap<>();
            barberInfo.put("count", barbers.size());
            barberInfo.put("sampleData", barbers.isEmpty() ? null : barbers.get(0));
            tableInfo.put("barbers", barberInfo);
            
            // Service table info
            List<ShopService> services = shopServiceRepository.findAll();
            Map<String, Object> serviceInfo = new HashMap<>();
            serviceInfo.put("count", services.size());
            serviceInfo.put("sampleData", services.isEmpty() ? null : services.get(0));
            tableInfo.put("services", serviceInfo);
            
            // TimeSlot table info
            List<TimeSlot> timeSlots = timeSlotRepository.findAll();
            Map<String, Object> timeSlotInfo = new HashMap<>();
            timeSlotInfo.put("count", timeSlots.size());
            timeSlotInfo.put("sampleData", timeSlots.isEmpty() ? null : timeSlots.get(0));
            tableInfo.put("timeSlots", timeSlotInfo);
            
            // Booking table info
            List<Booking> bookings = bookingRepository.findAll();
            Map<String, Object> bookingInfo = new HashMap<>();
            bookingInfo.put("count", bookings.size());
            bookingInfo.put("sampleData", bookings.isEmpty() ? null : bookings.get(0));
            tableInfo.put("bookings", bookingInfo);
            
            return ResponseEntity.ok(tableInfo);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error getting table info", e);
            return ResponseEntity.status(500).build();
        }
    }
}
