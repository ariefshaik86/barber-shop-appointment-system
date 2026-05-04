@echo off
setlocal enabledelayedexpansion

echo ========================================
echo Starting Barber Shop Backend Server
echo ========================================
echo.

REM Set Java environment
set JAVA_HOME=C:\Program Files\Java\jdk-25.0.2
set PATH=%JAVA_HOME%\bin;%PATH%

echo Java Home: %JAVA_HOME%
echo.

REM Check if Java is available
java -version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Java not found at %JAVA_HOME%
    pause
    exit /b 1
)

echo Java is available!
echo.

REM Check if MySQL is running
echo Checking MySQL connection...
netstat -an | findstr ":3306" >nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ MySQL is running on port 3306
) else (
    echo ❌ MySQL is not running on port 3306
    echo Please start MySQL/XAMPP first
    pause
    exit /b 1
)

echo.

REM Test database connection
echo Testing database connection...
mysql -u root -e "USE barberdb; SELECT 'Connection successful' as status;" 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Database connection successful
) else (
    echo ❌ Cannot connect to database 'barberdb'
    echo Please ensure MySQL is running and database exists
    pause
    exit /b 1
)

echo.

REM Start Spring Boot application
echo Starting Spring Boot application...
echo Backend will be available at: http://localhost:8080
echo Frontend is available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the application
.\mvnw.cmd spring-boot:run

echo.
echo Backend server stopped.
pause
