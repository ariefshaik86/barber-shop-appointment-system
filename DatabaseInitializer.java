import java.sql.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DatabaseInitializer {
    
    private static final String DB_URL = "jdbc:mysql://localhost:3306/barberdb";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "";
    
    public static void main(String[] args) {
        try {
            System.out.println("Starting database initialization...");
            
            // Load MySQL JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");
            
            // Connect to database
            Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            System.out.println("Connected to database successfully!");
            
            // Initialize data
            initializeBarbers(conn);
            initializeServices(conn);
            initializeTimeSlots(conn);
            
            conn.close();
            System.out.println("Database initialization completed successfully!");
            
        } catch (Exception e) {
            System.err.println("Error during database initialization: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    private static void initializeBarbers(Connection conn) throws SQLException {
        System.out.println("Initializing barbers...");
        
        String checkSql = "SELECT COUNT(*) FROM barbers";
        Statement checkStmt = conn.createStatement();
        ResultSet rs = checkStmt.executeQuery(checkSql);
        rs.next();
        int count = rs.getInt(1);
        
        if (count == 0) {
            String insertSql = "INSERT INTO barbers (name, experience, specialties) VALUES (?, ?, ?)";
            PreparedStatement pstmt = conn.prepareStatement(insertSql);
            
            String[][] barbers = {
                {"John Smith", "10 years experience", "Classic cuts, modern styles"},
                {"Mike Johnson", "8 years experience", "Beard styling, hot towel shaves"},
                {"David Wilson", "12 years experience", "Premium styling, color treatments"},
                {"Chris Brown", "5 years experience", "Kids cuts, modern trends"},
                {"Tom Davis", "15 years experience", "Traditional barbering, expert shaves"}
            };
            
            for (String[] barber : barbers) {
                pstmt.setString(1, barber[0]);
                pstmt.setString(2, barber[1]);
                pstmt.setString(3, barber[2]);
                pstmt.executeUpdate();
            }
            
            System.out.println("Created 5 barbers");
        } else {
            System.out.println("Barbers already exist: " + count + " records");
        }
        
        checkStmt.close();
    }
    
    private static void initializeServices(Connection conn) throws SQLException {
        System.out.println("Initializing services...");
        
        String checkSql = "SELECT COUNT(*) FROM shop_services";
        Statement checkStmt = conn.createStatement();
        ResultSet rs = checkStmt.executeQuery(checkSql);
        rs.next();
        int count = rs.getInt(1);
        
        if (count == 0) {
            String insertSql = "INSERT INTO shop_services (name, price, duration) VALUES (?, ?, ?)";
            PreparedStatement pstmt = conn.prepareStatement(insertSql);
            
            String[][] services = {
                {"Classic Haircut", "800", "30"},
                {"Beard Trim & Style", "500", "20"},
                {"Hot Towel Shave", "600", "25"},
                {"Hair & Beard Package", "1200", "45"},
                {"Kids Haircut", "400", "20"},
                {"Premium Styling", "1000", "40"},
                {"Color Treatment", "1500", "60"},
                {"Head Massage", "300", "15"},
                {"Face Mask", "400", "20"},
                {"Senior Citizen Cut", "600", "30"}
            };
            
            for (String[] service : services) {
                pstmt.setString(1, service[0]);
                pstmt.setDouble(2, Double.parseDouble(service[1]));
                pstmt.setInt(3, Integer.parseInt(service[2]));
                pstmt.executeUpdate();
            }
            
            System.out.println("Created 10 services");
        } else {
            System.out.println("Services already exist: " + count + " records");
        }
        
        checkStmt.close();
    }
    
    private static void initializeTimeSlots(Connection conn) throws SQLException {
        System.out.println("Initializing time slots...");
        
        String checkSql = "SELECT COUNT(*) FROM time_slots";
        Statement checkStmt = conn.createStatement();
        ResultSet rs = checkStmt.executeQuery(checkSql);
        rs.next();
        int count = rs.getInt(1);
        
        if (count == 0) {
            String insertSql = "INSERT INTO time_slots (slot_time, available) VALUES (?, ?)";
            PreparedStatement pstmt = conn.prepareStatement(insertSql);
            
            LocalDateTime startDate = LocalDateTime.now().plusDays(1).withHour(9).withMinute(0).withSecond(0).withNano(0);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            
            // Generate time slots for next 7 days
            for (int day = 0; day < 7; day++) {
                LocalDateTime currentDay = startDate.plusDays(day);
                
                // Generate slots from 9 AM to 6 PM (18 slots of 30 minutes each)
                for (int slot = 0; slot < 18; slot++) {
                    LocalDateTime slotTime = currentDay.plusMinutes(slot * 30);
                    pstmt.setString(1, slotTime.format(formatter));
                    pstmt.setBoolean(2, true);
                    pstmt.executeUpdate();
                }
            }
            
            System.out.println("Created 126 time slots (7 days × 18 slots)");
        } else {
            System.out.println("Time slots already exist: " + count + " records");
        }
        
        checkStmt.close();
    }
}
