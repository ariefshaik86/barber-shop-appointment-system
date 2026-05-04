package com.barbershop.model;

import jakarta.persistence.*;

@Entity
@Table(name = "time_slots")
public class TimeSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String slotTime;

    @Column(nullable = false)
    private Boolean available;

    public TimeSlot() {
        this.available = true;
    }

    public TimeSlot(String slotTime) {
        this();
        this.slotTime = slotTime;
    }

    public TimeSlot(String slotTime, Boolean available) {
        this.slotTime = slotTime;
        this.available = available;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSlotTime() {
        return slotTime;
    }

    public void setSlotTime(String slotTime) {
        this.slotTime = slotTime;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }
}
