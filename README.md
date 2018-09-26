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
First activate the dev profile in application.properties by changing the following property
```
spring.profiles.active=dev
```
We use MariaDB as production database. Install MariaDB locally on your computer (https://mariadb.org/). When you are done open the database terminal, login and create a database with
```
mysql -u root -p //-p only if you set a password
create database db_cookbook;
```
We use Flyway to setup the tables, contraints and content of the database.
The database migration will run automatically on startup of the spring boot application or manually with
```
gradlew flywayMigrate
```
Use ```gradlew flywayMigrate``` to cleanup your test database.


