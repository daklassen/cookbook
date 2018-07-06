package de.david.cookbook.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByKeycloakUserId(String keycloakUserId);

    List<User> findByEmail(String email);
}
