package com.barbershop.repository;

import com.barbershop.model.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {
    TimeSlot findBySlotTime(String slotTime);
    boolean existsBySlotTime(String slotTime);
}
