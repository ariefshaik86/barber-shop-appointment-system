package com.barbershop.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping
    public Map<String, Object> getApiInfo() {
        Map<String, Object> apiInfo = new HashMap<>();
        apiInfo.put("name", "Barber Shop API");
        apiInfo.put("version", "1.0.0");
        apiInfo.put("description", "REST API for Barber Shop Appointment System");
        apiInfo.put("status", "Running");
        
        Map<String, String> endpoints = new HashMap<>();
        endpoints.put("bookings", "/api/bookings - CRUD operations for bookings");
        endpoints.put("barbers", "/api/barbers - Get barber information");
        endpoints.put("services", "/api/services - Get service information");
        endpoints.put("timeslots", "/api/timeslots - Get available time slots");
        
        apiInfo.put("endpoints", endpoints);
        
        Map<String, String> examples = new HashMap<>();
        examples.put("GET all bookings", "GET /api/bookings");
        examples.put("GET booking by ID", "GET /api/bookings/{id}");
        examples.put("Create booking", "POST /api/bookings");
        examples.put("Update booking status", "PUT /api/bookings/{id}/status");
        examples.put("Delete booking", "DELETE /api/bookings/{id}");
        examples.put("Get bookings by status", "GET /api/bookings/status/{status}");
        examples.put("Get bookings by barber", "GET /api/bookings/barber/{barberName}");
        examples.put("Check time slot availability", "GET /api/bookings/available/{dateTime}/{barberName}");
        
        apiInfo.put("examples", examples);
        
        return apiInfo;
    }
    
    @GetMapping("/health")
    public Map<String, Object> healthCheck() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("timestamp", java.time.LocalDateTime.now());
        health.put("service", "Barber Shop Backend API");
        return health;
    }
}
