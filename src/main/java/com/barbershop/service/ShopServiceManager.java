package com.barbershop.service;

import com.barbershop.model.ShopService;
import com.barbershop.repository.ShopServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class ShopServiceManager {

    @Autowired
    private ShopServiceRepository shopServiceRepository;

    public List<ShopService> getAllServices() {
        return shopServiceRepository.findAll();
    }

    public Optional<ShopService> getServiceById(Long id) {
        return shopServiceRepository.findById(id);
    }

    public ShopService createService(ShopService service) {
        return shopServiceRepository.save(service);
    }

    public Optional<ShopService> updateService(Long id, ShopService serviceDetails) {
        Optional<ShopService> serviceOpt = shopServiceRepository.findById(id);
        if (serviceOpt.isPresent()) {
            ShopService service = serviceOpt.get();
            service.setName(serviceDetails.getName());
            service.setPrice(serviceDetails.getPrice());
            service.setDuration(serviceDetails.getDuration());
            return Optional.of(shopServiceRepository.save(service));
        }
        return Optional.empty();
    }

    public void deleteService(Long id) {
        shopServiceRepository.deleteById(id);
    }

    public ShopService findByName(String name) {
        return shopServiceRepository.findByName(name);
    }

    public boolean existsByName(String name) {
        return shopServiceRepository.existsByName(name);
    }
}
