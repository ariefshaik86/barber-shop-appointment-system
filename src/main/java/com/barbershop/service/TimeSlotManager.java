package com.barbershop.service;

import com.barbershop.model.TimeSlot;
import com.barbershop.repository.TimeSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class TimeSlotManager {

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    public List<TimeSlot> getAllTimeSlots() {
        return timeSlotRepository.findAll();
    }

    public Optional<TimeSlot> getTimeSlotById(Long id) {
        return timeSlotRepository.findById(id);
    }

    public TimeSlot createTimeSlot(TimeSlot timeSlot) {
        return timeSlotRepository.save(timeSlot);
    }

    public Optional<TimeSlot> toggleTimeSlotAvailability(Long id) {
        Optional<TimeSlot> timeSlotOpt = timeSlotRepository.findById(id);
        if (timeSlotOpt.isPresent()) {
            TimeSlot timeSlot = timeSlotOpt.get();
            timeSlot.setAvailable(!timeSlot.getAvailable());
            return Optional.of(timeSlotRepository.save(timeSlot));
        }
        return Optional.empty();
    }

    public void deleteTimeSlot(Long id) {
        timeSlotRepository.deleteById(id);
    }

    public TimeSlot findBySlotTime(String slotTime) {
        return timeSlotRepository.findBySlotTime(slotTime);
    }

    public boolean existsBySlotTime(String slotTime) {
        return timeSlotRepository.existsBySlotTime(slotTime);
    }
}
