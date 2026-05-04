# Barber Shop Appointment System


https://github.com/user-attachments/assets/499d9b4f-3213-40e9-acc2-c8ef44863c05




A full-stack barber shop appointment management system built with Spring Boot (backend) and React (frontend).


## Tech Stack

### Backend
- **Spring Boot 3.2.0** (Java 17)
- **Spring Data JPA** (Hibernate)
- **MySQL** (XAMPP)
- **Maven**

### Frontend
- **React 18** with Vite
- **Bootstrap 5**
- **Axios** for API calls
- **Framer Motion** for animations
- **React Router** for navigation

## Features

### Customer App
- Step-based booking flow (Service → Barber → Time → Details)
- Real-time availability checking
- Premium dark theme with glassmorphism
- Smooth animations and transitions

### Admin Dashboard
- Sidebar navigation with collapsible menu
- Dashboard overview with statistics
- Full CRUD operations for:
  - Bookings (with status management)
  - Barbers
  - Services
  - Time Slots
- Real-time data updates

## Setup Instructions

### Prerequisites
- Java 17+
- Node.js 16+
- MySQL (XAMPP recommended)
- Maven

### Database Setup

1. **Start MySQL via XAMPP**
2. **Create database:**
   ```sql
   CREATE DATABASE barberdb;
   ```
3. **Run the provided setup script:**
   ```bash
   mysql -u root -p < database_setup.sql
   ```

### Backend Setup

1. **Navigate to project root:**
   ```bash
   cd /path/to/project
   ```

2. **Build and run Spring Boot:**
   ```bash
   mvn clean spring-boot:run
   ```

3. **Backend will start on:** `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Frontend will start on:** `http://localhost:3000`

## API Endpoints

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/{id}/status` - Update booking status
- `DELETE /api/bookings/{id}` - Delete booking

### Barbers
- `GET /api/barbers` - Get all barbers
- `POST /api/barbers` - Add barber
- `DELETE /api/barbers/{id}` - Delete barber

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Add service
- `PUT /api/services/{id}` - Update service
- `DELETE /api/services/{id}` - Delete service

### Time Slots
- `GET /api/timeslots` - Get all time slots
- `POST /api/timeslots` - Add time slot
- `PUT /api/timeslots/{id}/toggle` - Toggle availability
- `DELETE /api/timeslots/{id}` - Delete time slot

## Initial Data Setup

1. **Access Admin Dashboard:** `http://localhost:3000/admin`
2. **Add Services** (examples):
   - Classic Cut - $25 - 30 minutes
   - Beard Trim - $15 - 20 minutes
   - Hot Towel Shave - $35 - 45 minutes

3. **Add Barbers** with their experience
4. **Generate Time Slots** using the "Generate Default Slots" button

## Project Structure

```
├── src/main/java/com/barbershop/
│   ├── controller/          # REST Controllers
│   ├── service/            # Business Logic (Manager classes)
│   ├── repository/         # JPA Repositories
│   ├── model/             # JPA Entities
│   └── BarberShopApplication.java
├── src/main/resources/
│   └── application.properties
├── frontend/
│   ├── src/
│   │   ├── components/    # React Components
│   │   ├── services/      # API Services
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── pom.xml
└── README.md
```

## Important Notes

- **No Lombok used** - All getters/setters written manually
- **No "Service" class naming** - Used "Manager" instead to avoid Spring conflicts
- **MySQL runs on port 3306** - Configured in application.properties
- **Backend runs on port 8080** - Frontend proxy configured accordingly
- **Cross-origin enabled** - `@CrossOrigin("*")` on all controllers

## Troubleshooting

### Backend Issues
- **Database connection:** Ensure MySQL is running and database exists
- **Port conflicts:** Check if port 8080 is available
- **Compilation errors:** Run `mvn clean compile` to check for issues

### Frontend Issues
- **API connection:** Ensure backend is running on port 8080
- **Missing dependencies:** Run `npm install` in frontend directory
- **Build errors:** Check browser console for specific errors

## License

This project is for educational purposes. Feel free to modify and use as needed.
