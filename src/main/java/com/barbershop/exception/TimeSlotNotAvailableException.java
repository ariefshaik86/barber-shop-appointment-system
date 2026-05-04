package com.barbershop.exception;

public class TimeSlotNotAvailableException extends RuntimeException {
    
    public TimeSlotNotAvailableException(String barberName, String dateTime) {
        super("Time slot is not available for " + barberName + " at " + dateTime);
    }
    
    public TimeSlotNotAvailableException(String message) {
        super(message);
    }
}
