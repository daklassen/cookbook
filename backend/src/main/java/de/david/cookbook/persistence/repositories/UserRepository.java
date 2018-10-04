package de.david.cookbook.persistence.repositories;

import de.david.cookbook.persistence.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByKeycloakUserId(String keycloakUserId);
}
