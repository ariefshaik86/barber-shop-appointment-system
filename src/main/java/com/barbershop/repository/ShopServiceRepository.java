package com.barbershop.repository;

import com.barbershop.model.ShopService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShopServiceRepository extends JpaRepository<ShopService, Long> {
    ShopService findByName(String name);
    boolean existsByName(String name);
}
