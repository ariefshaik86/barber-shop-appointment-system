package com.barbershop.controller;

import com.barbershop.model.Barber;
import com.barbershop.service.BarberManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/barbers")
@CrossOrigin("*")
public class BarberController {

    @Autowired
    private BarberManager barberManager;

    @GetMapping
    public List<Barber> getAllBarbers() {
        return barberManager.getAllBarbers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Barber> getBarberById(@PathVariable Long id) {
        Optional<Barber> barber = barberManager.getBarberById(id);
        return barber.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Barber createBarber(@RequestBody Barber barber) {
        return barberManager.createBarber(barber);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBarber(@PathVariable Long id) {
        barberManager.deleteBarber(id);
        return ResponseEntity.noContent().build();
    }
}
