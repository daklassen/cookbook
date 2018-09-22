package de.david.cookbook.persistence.entities;

import javax.persistence.*;

/**
 * Benutzer-Entity zur Anlage und Verwaltung von Rezepten.
 */
@Entity(name = "CB_USER")
public class User {

    @Id
    @GeneratedValue
    @Column(name = "ID")
    private Long id;

    @Column(name = "FIRST_NAME", nullable = false)
    private String firstName;

    @Column(name = "LAST_NAME", nullable = false)
    private String lastName;

    @Column(name = "EMAIL", nullable = false)
    private String email;

    @Column(name = "KEYCLOAK_USER_ID", nullable = false)
    private String keycloakUserId;

    public User(String firstName, String lastName, String email, String keycloakUserId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.keycloakUserId = keycloakUserId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
