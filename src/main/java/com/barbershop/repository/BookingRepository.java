package com.barbershop.repository;

import com.barbershop.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    List<Booking> findByStatus(String status);
    
    List<Booking> findByBarberName(String barberName);
    
    List<Booking> findByDateTimeBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT b FROM Booking b WHERE b.dateTime = :dateTime AND b.barberName = :barberName")
    List<Booking> findByDateTimeAndBarber(@Param("dateTime") LocalDateTime dateTime, @Param("barberName") String barberName);
    
    @Query("SELECT COUNT(b) > 0 FROM Booking b WHERE b.dateTime = :dateTime AND b.barberName = :barberName AND b.status != 'CANCELLED'")
    boolean existsByDateTimeAndBarberAndNotCancelled(@Param("dateTime") LocalDateTime dateTime, @Param("barberName") String barberName);
}
