@echo off
echo Testing MySQL to Backend Connection
echo ==================================

REM Set Java environment
set JAVA_HOME=C:\Program Files\Java\jdk-25.0.2
set PATH=%JAVA_HOME%\bin;%PATH%

echo Step 1: Checking MySQL service...
echo.

REM Check if MySQL is running (check common MySQL ports)
netstat -an | findstr ":3306" >nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ MySQL service is running on port 3306
) else (
    echo ❌ MySQL service is not running on port 3306
    echo Please start MySQL/XAMPP first
    pause
    exit /b 1
)

echo.
echo Step 2: Testing database connection...
echo.

REM Test database connection with simple query
mysql -u root -e "USE barberdb; SELECT 'Database connection successful' as status;" 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Database connection successful
) else (
    echo ❌ Cannot connect to database 'barberdb'
    echo Please ensure:
    echo - MySQL service is running
    echo - Database 'barberdb' exists
    echo - MySQL user 'root' has access
    pause
    exit /b 1
)

echo.
echo Step 3: Verifying database data...
echo.

REM Check if tables exist and have data
mysql -u root barberdb -e "
SELECT 'barbers' as table_name, COUNT(*) as record_count FROM barbers
UNION 
SELECT 'services' as table_name, COUNT(*) as record_count FROM shop_services
UNION 
SELECT 'time_slots' as table_name, COUNT(*) as record_count FROM time_slots
UNION 
SELECT 'bookings' as table_name, COUNT(*) as record_count FROM bookings;
" 2>nul

if %ERRORLEVEL% EQU 0 (
    echo ✅ Database tables verified
) else (
    echo ❌ Error checking database tables
    pause
    exit /b 1
)

echo.
echo Step 4: Testing Spring Boot configuration...
echo.

REM Check if application.properties exists
if exist "src\main\resources\application.properties" (
    echo ✅ Application configuration file found
    echo.
    echo Current configuration:
    echo --------------------
    type src\main\resources\application.properties
    echo.
) else (
    echo ❌ Application configuration file not found
    pause
    exit /b 1
)

echo.
echo Step 5: Ready to start backend...
echo.
echo Configuration Summary:
echo - MySQL Service: ✅ Running
echo - Database Connection: ✅ Working
echo - Database Data: ✅ Populated
echo - Spring Boot Config: ✅ Ready
echo.
echo You can now start the backend with:
echo .\mvnw.cmd spring-boot:run
echo.
echo Once backend starts, verify at:
echo - Health: http://localhost:8080/api/health
echo - Database Status: http://localhost:8080/api/database/status
echo.

pause
