# Backend Startup Guide

## Current Status
✅ MySQL is installed and database is populated with data  
❌ MySQL command line tool not in PATH  
❌ Backend server not started yet  

## Solution: Start Backend Server

### Option 1: Use XAMPP Control Panel (Recommended)

1. **Open XAMPP Control Panel**
2. **Start MySQL service** (if not already running)
3. **Open Command Prompt** as Administrator
4. **Navigate to project directory**:
   ```bash
   cd C:\Users\USER\OneDrive\Desktop\new
   ```
5. **Set Java environment**:
   ```bash
   set JAVA_HOME=C:\Program Files\Java\jdk-25.0.2
   set PATH=%JAVA_HOME%\bin;%PATH%
   ```
6. **Start backend**:
   ```bash
   .\mvnw.cmd spring-boot:run
   ```

### Option 2: Use XAMPP MySQL Tools

1. **Start XAMPP Control Panel**
2. **Start MySQL service**
3. **Open phpMyAdmin** (http://localhost/phpmyadmin)
4. **Verify database exists** (should see "barberdb")
5. **Follow Option 1 steps 3-6** to start backend

### Option 3: Manual MySQL Path Setup

1. **Find MySQL installation** (usually in XAMPP/mysql/bin)
2. **Add to PATH**:
   ```bash
   set PATH=C:\xampp\mysql\bin;%PATH%
   ```
3. **Test MySQL connection**:
   ```bash
   mysql -u root -e "SELECT 1"
   ```
4. **Start backend** (see Option 1)

## Verification

Once backend is running, check these URLs:

- **Health Check**: http://localhost:8080/api/health
- **Database Status**: http://localhost:8080/api/database/status
- **API Info**: http://localhost:8080/api

## Expected Results

### Database Status Should Show:
```json
{
  "database": "barberdb",
  "status": "Connected",
  "tableCounts": {
    "barbers": 5,
    "services": 10,
    "timeSlots": 126,
    "bookings": 0
  },
  "dataInitialized": true
}
```

### Health Check Should Show:
```json
{
  "status": "UP",
  "timestamp": "...",
  "service": "Barber Shop Backend API"
}
```

## Troubleshooting

### Issue: "mvnw.cmd not found"
- Ensure you're in the correct directory
- Check if Maven wrapper exists in project folder

### Issue: "JAVA_HOME not found"
- Set JAVA_HOME manually:
  ```bash
  set JAVA_HOME=C:\Program Files\Java\jdk-25.0.2
  ```

### Issue: "Cannot connect to MySQL"
- Ensure MySQL service is running in XAMPP
- Check if database "barberdb" exists
- Verify MySQL credentials (root, no password)

### Issue: "Port 8080 already in use"
- Stop other applications using port 8080
- Or change port in application.properties

## Quick Start Commands

```bash
# 1. Start XAMPP MySQL
# 2. Open Command Prompt as Admin
cd C:\Users\USER\OneDrive\Desktop\new
set JAVA_HOME=C:\Program Files\Java\jdk-25.0.2
.\mvnw.cmd spring-boot:run

# 3. Verify in browser
# http://localhost:8080/api/health
```

## Success Indicators

✅ Backend starts without errors  
✅ Shows "Started BarberShopApplication" message  
✅ Health check returns "UP" status  
✅ Database status shows populated data  
✅ Frontend can connect to backend APIs  

Once backend is running successfully, the Barber Shop Appointment System will be fully operational!
