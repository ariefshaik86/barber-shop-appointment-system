@echo off
echo Barber Shop Appointment System Setup
echo ===================================
echo.

echo Checking for Maven...
mvn --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Maven is not installed or not in PATH
    echo.
    echo Please install Maven first:
    echo 1. Download Maven from: https://maven.apache.org/download.cgi
    echo 2. Extract to a folder (e.g., C:\maven)
    echo 3. Add MAVEN_HOME environment variable
    echo 4. Add %MAVEN_HOME%\bin to PATH
    echo.
    echo After installing Maven, run this script again.
    pause
    exit /b 1
)

echo Maven found! Starting the application...
echo.

echo Cleaning and compiling...
mvn clean compile

echo.
echo Starting Spring Boot application...
mvn spring-boot:run

pause
