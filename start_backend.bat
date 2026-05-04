@echo off
echo Starting Barber Shop Backend Server
echo ====================================

REM Set Java environment
set JAVA_HOME=C:\Program Files\Java\jdk-25.0.2
set PATH=%JAVA_HOME%\bin;%PATH%

echo Java Home: %JAVA_HOME%
echo.

REM Check if Java is available
java -version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Java not found at %JAVA_HOME%
    echo Please ensure Java is installed correctly
    pause
    exit /b 1
)

echo Java is available!
echo.

REM Check if MySQL is running
echo Checking MySQL connection...
mysql -u root -e "SELECT 1" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Warning: Cannot connect to MySQL
    echo Please ensure MySQL is running
    echo.
)

REM Check if database exists
mysql -u root -e "USE barberdb" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Database 'barberdb' not found
    echo Please run the database setup script first
    pause
    exit /b 1
)

echo Database connection OK!
echo.

REM Start the Spring Boot application
echo Starting Spring Boot application...
echo Backend will be available at: http://localhost:8080
echo Frontend is available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Try to run with Maven
if exist "mvnw.cmd" (
    echo Using Maven wrapper...
    .\mvnw.cmd spring-boot:run
) else (
    echo Maven wrapper not found, trying direct Java execution...
    
    REM Create a simple classpath with all JAR files
    set CLASSPATH=.
    for %%f in (target\dependency\*.jar) do (
        set CLASSPATH=!CLASSPATH!;%%f
    )
    set CLASSPATH=!CLASSPATH!;target\classes
    
    echo Classpath: !CLASSPATH!
    java -cp "!CLASSPATH!" com.barbershop.BarberShopApplication
)

echo.
echo Backend server stopped.
pause
