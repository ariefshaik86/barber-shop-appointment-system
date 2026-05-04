@echo off
echo Complete Barber Shop Setup
echo ===========================

REM Set Java environment
set JAVA_HOME=C:\Program Files\Java\jdk-25.0.2
set PATH=%JAVA_HOME%\bin;%PATH%

echo Step 1: Checking Java...
java -version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Java not found
    pause
    exit /b 1
)
echo Java OK!

echo.
echo Step 2: Setting up MySQL database...
echo.

REM Try to connect to MySQL and create database
echo Creating database if not exists...
mysql -u root -e "CREATE DATABASE IF NOT EXISTS barberdb;" 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Warning: Could not create database automatically
    echo Please ensure MySQL is running (XAMPP or MySQL service)
    echo.
    echo Manual setup required:
    echo 1. Start MySQL/XAMPP
    echo 2. Run: mysql -u root < complete_database_setup.sql
    echo.
)

echo.
echo Step 3: Checking database connection...
mysql -u root -e "USE barberdb; SELECT COUNT(*) as barber_count FROM barbers;" 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Database setup incomplete. Running setup script...
    mysql -u root < complete_database_setup.sql
    if %ERRORLEVEL% NEQ 0 (
        echo Error: Database setup failed
        echo Please run manually: mysql -u root < complete_database_setup.sql
        pause
        exit /b 1
    )
)

echo Database setup complete!
echo.

echo Step 4: Starting Backend Server...
echo ====================================
echo.
echo Backend will start at: http://localhost:8080
echo Frontend is at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start Spring Boot application
if exist "mvnw.cmd" (
    echo Using Maven wrapper to start backend...
    .\mvnw.cmd spring-boot:run
) else (
    echo Maven wrapper not found
    echo Please ensure Maven is installed and mvnw.cmd exists
    pause
)

echo.
echo Backend server stopped.
pause
