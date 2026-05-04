package com.barbershop.service;

import com.barbershop.model.Barber;
import com.barbershop.repository.BarberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class BarberManager {

    @Autowired
    private BarberRepository barberRepository;

    // ================= GET ALL =================
    public List<Barber> getAllBarbers() {
        return barberRepository.findAll();
    }

    // ================= GET BY ID =================
    public Optional<Barber> getBarberById(Long id) {
        return barberRepository.findById(id);
    }

    // ================= CREATE =================
    public Barber createBarber(Barber barber) {

        // 🔥 Prevent duplicate names
        if (barberRepository.existsByName(barber.getName())) {
            throw new RuntimeException("Barber with this name already exists");
        }

        return barberRepository.save(barber);
    }

    // ================= DELETE =================
    public void deleteBarber(Long id) {

        if (!barberRepository.existsById(id)) {
            throw new RuntimeException("Barber not found");
        }

        barberRepository.deleteById(id);
    }

    // ================= FIND BY NAME =================
    public Barber findByName(String name) {
        return barberRepository.findByName(name);
    }

    // ================= CHECK EXISTS =================
    public boolean existsByName(String name) {
        return barberRepository.existsByName(name);
    }
}