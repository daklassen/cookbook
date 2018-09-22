## Cookbook
A simple cookbook application to learn stuff and have fun while doing it.

### Quickstart

Start **Keycloak** server:
```
cd keycloak\keycloak-3.4.3.Final\bin
standalone.bat
```

Start **Spring Boot** backend server:
```
cd backend\
graldew bootrun
```

Start **Angular 6** frontend:
```
cd frontend\
ng serve
```

Navigate to the Angular frontend:
```
http://localhost:4200

// Username: david
// Password: david1
```

### General informations

You manage users with keycloak. You can reach the keycloak frontend at: 
```
http://localhost:8080/auth/admin/

// Username: admin
// Password: admin
```
# Contribution

## Setup your Testdatabase
First set the Dev-Profile in application.properties active by chaing the following property
```
spring.profiles.active=dev
```
We use MariaDB as Production-Database. Install MariaDB locally on your Computer (https://mariadb.org/). When you are done open the database terminal, login and create a Databsae with
```
mysql -u root -p //-p only if you set a password
create database db_cookbook;
```
We use Flyway to setup the Tables, Contraints and Content of the database.
The Database Migration will run automatically on startup of the Springboot Application or manually with
```
gradlew flywayMigrate
```
Use ```gradlew flywayMigrate``` to cleanup your Testdatabase


