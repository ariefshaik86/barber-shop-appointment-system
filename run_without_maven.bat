@echo off
echo Barber Shop Appointment System - Direct Java Run
echo ==============================================
echo.

echo Checking Java...
java -version
if %errorlevel% neq 0 (
    echo Java is not installed or not in PATH
    pause
    exit /b 1
)

echo.
echo Setting up classpath...
set CLASSPATH=src\main\java

echo.
echo NOTE: This is a simplified run script.
echo For full functionality with Spring Boot dependencies,
echo please install Maven and run: mvn spring-boot:run
echo.
echo You can also use the setup_and_run.bat script after installing Maven.
echo.
echo Instructions to install Maven:
echo 1. Download from: https://maven.apache.org/download.cgi
echo 2. Extract and add to PATH
echo 3. Set MAVEN_HOME environment variable
echo.
pause
