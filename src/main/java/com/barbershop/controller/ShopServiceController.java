package com.barbershop.controller;

import com.barbershop.model.ShopService;
import com.barbershop.service.ShopServiceManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/services")
@CrossOrigin("*")
public class ShopServiceController {

    @Autowired
    private ShopServiceManager shopServiceManager;

    @GetMapping
    public List<ShopService> getAllServices() {
        return shopServiceManager.getAllServices();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShopService> getServiceById(@PathVariable Long id) {
        Optional<ShopService> service = shopServiceManager.getServiceById(id);
        return service.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ShopService createService(@RequestBody ShopService service) {
        return shopServiceManager.createService(service);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShopService> updateService(@PathVariable Long id, @RequestBody ShopService serviceDetails) {
        Optional<ShopService> updatedService = shopServiceManager.updateService(id, serviceDetails);
        return updatedService.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        shopServiceManager.deleteService(id);
        return ResponseEntity.noContent().build();
    }
}
