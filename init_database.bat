@echo off
echo Initializing Barber Shop Database...
echo.

REM Check if MySQL is running and database exists
mysql -u root -p -e "USE barberdb; SHOW TABLES;" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Cannot connect to MySQL database 'barberdb'
    echo Please ensure MySQL is running and database 'barberdb' exists
    pause
    exit /b 1
)

echo Database connection successful!
echo.

REM Run the initialization script
echo Running data initialization script...
mysql -u root barberdb < init_data.sql

if %ERRORLEVEL% EQU 0 (
    echo Data initialization completed successfully!
) else (
    echo Error during data initialization
    pause
    exit /b 1
)

echo.
echo Database Status:
mysql -u root barberdb -e "SELECT 'barbers' as table_name, COUNT(*) as record_count FROM barbers UNION SELECT 'services' as table_name, COUNT(*) as record_count FROM shop_services UNION SELECT 'time_slots' as table_name, COUNT(*) as record_count FROM time_slots UNION SELECT 'bookings' as table_name, COUNT(*) as record_count FROM bookings;"

echo.
echo Database initialization complete!
pause
