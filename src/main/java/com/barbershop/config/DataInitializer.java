package com.barbershop.config;

import com.barbershop.model.Barber;
import com.barbershop.model.ShopService;
import com.barbershop.model.TimeSlot;
import com.barbershop.repository.BarberRepository;
import com.barbershop.repository.ShopServiceRepository;
import com.barbershop.repository.TimeSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;
import java.util.logging.Level;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = Logger.getLogger(DataInitializer.class.getName());

    @Autowired
    private BarberRepository barberRepository;

    @Autowired
    private ShopServiceRepository shopServiceRepository;

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    @Override
    public void run(String... args) throws Exception {
        logger.info("Initializing database with sample data...");
        
        try {
            initializeBarbers();
            initializeServices();
            initializeTimeSlots();
            
            logger.info("Database initialization completed successfully!");
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error initializing database data", e);
        }
    }

    private void initializeBarbers() {
        if (barberRepository.count() == 0) {
            logger.info("Creating sample barbers...");
            
            List<Barber> barbers = Arrays.asList(
                new Barber("John Smith", "10 years experience", "Classic cuts, modern styles"),
                new Barber("Mike Johnson", "8 years experience", "Beard styling, hot towel shaves"),
                new Barber("David Wilson", "12 years experience", "Premium styling, color treatments"),
                new Barber("Chris Brown", "5 years experience", "Kids cuts, modern trends"),
                new Barber("Tom Davis", "15 years experience", "Traditional barbering, expert shaves")
            );
            
            barberRepository.saveAll(barbers);
            logger.info("Created " + barbers.size() + " barbers");
        } else {
            logger.info("Barbers already exist in database");
        }
    }

    private void initializeServices() {
        if (shopServiceRepository.count() == 0) {
            logger.info("Creating sample services...");
            
            List<ShopService> services = Arrays.asList(
                new ShopService("Classic Haircut", 800.0, 30),
                new ShopService("Beard Trim & Style", 500.0, 20),
                new ShopService("Hot Towel Shave", 600.0, 25),
                new ShopService("Hair & Beard Package", 1200.0, 45),
                new ShopService("Kids Haircut", 400.0, 20),
                new ShopService("Premium Styling", 1000.0, 40),
                new ShopService("Color Treatment", 1500.0, 60),
                new ShopService("Head Massage", 300.0, 15),
                new ShopService("Face Mask", 400.0, 20),
                new ShopService("Senior Citizen Cut", 600.0, 30)
            );
            
            shopServiceRepository.saveAll(services);
            logger.info("Created " + services.size() + " services");
        } else {
            logger.info("Services already exist in database");
        }
    }

    private void initializeTimeSlots() {
        if (timeSlotRepository.count() == 0) {
            logger.info("Creating sample time slots...");
            
            // Generate time slots for the next 7 days
            LocalDateTime startDate = LocalDateTime.now().with(LocalTime.of(9, 0)).plusDays(1);
            LocalDateTime endDate = startDate.plusDays(7);
            
            List<TimeSlot> timeSlots = java.util.stream.Stream.iterate(startDate, date -> date.plusDays(1))
                .limit(7)
                .flatMap(date -> generateDailySlots(date))
                .toList();
            
            timeSlotRepository.saveAll(timeSlots);
            logger.info("Created " + timeSlots.size() + " time slots");
        } else {
            logger.info("Time slots already exist in database");
        }
    }

    private java.util.stream.Stream<TimeSlot> generateDailySlots(LocalDateTime date) {
        // Generate slots from 9 AM to 6 PM with 30-minute intervals
        return java.util.stream.IntStream.range(0, 18) // 9 AM to 6 PM = 9 hours = 18 slots of 30 mins
            .mapToObj(i -> {
                LocalDateTime slotTime = date.plusMinutes(i * 30);
                return new TimeSlot(slotTime.toString(), true);
            });
    }
}
