package com.barbershop.controller;

import com.barbershop.model.TimeSlot;
import com.barbershop.service.TimeSlotManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/timeslots")
@CrossOrigin("*")
public class TimeSlotController {

    @Autowired
    private TimeSlotManager timeSlotManager;

    @GetMapping
    public List<TimeSlot> getAllTimeSlots() {
        return timeSlotManager.getAllTimeSlots();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TimeSlot> getTimeSlotById(@PathVariable Long id) {
        Optional<TimeSlot> timeSlot = timeSlotManager.getTimeSlotById(id);
        return timeSlot.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public TimeSlot createTimeSlot(@RequestBody TimeSlot timeSlot) {
        return timeSlotManager.createTimeSlot(timeSlot);
    }

    @PutMapping("/{id}/toggle")
    public ResponseEntity<TimeSlot> toggleTimeSlotAvailability(@PathVariable Long id) {
        Optional<TimeSlot> updatedTimeSlot = timeSlotManager.toggleTimeSlotAvailability(id);
        return updatedTimeSlot.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTimeSlot(@PathVariable Long id) {
        timeSlotManager.deleteTimeSlot(id);
        return ResponseEntity.noContent().build();
    }
}
