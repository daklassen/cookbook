package de.david.cookbook.persistence.repositories;

import de.david.cookbook.persistence.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
