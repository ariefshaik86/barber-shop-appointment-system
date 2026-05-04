@echo off
echo Starting Barber Shop Backend (Simple Mode)
echo ====================================
echo.

echo NOTE: This is a simplified run without Maven dependencies.
echo For full functionality, please install Maven and run: mvn spring-boot:run
echo.

echo Checking database connection...
echo Make sure MySQL is running and database 'barberdb' exists.
echo.

echo To run the full application:
echo 1. Install Maven from: https://maven.apache.org/download.cgi
echo 2. Set MAVEN_HOME environment variable
echo 3. Add Maven to PATH
echo 4. Run: mvn spring-boot:run
echo.

echo Frontend is running at: http://localhost:3000
echo Backend will run at: http://localhost:8080 (when Maven is installed)
echo.

pause
