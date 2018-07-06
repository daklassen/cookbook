package de.david.cookbook.persistence;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {
    @Id
    @GeneratedValue()
    private long id;

    private String firstName;
    private String lastName;
    private String email;
    private String keycloakUserId;

    public User() {}

    public User(String firstName, String lastName, String email, String keycloakUserId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.keycloakUserId = keycloakUserId;
    }

    public long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getKeycloakUserId() {
        return keycloakUserId;
    }

    public void setKeycloakUserId(String keycloakUserId) {
        this.keycloakUserId = keycloakUserId;
    }
}
