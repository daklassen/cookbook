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