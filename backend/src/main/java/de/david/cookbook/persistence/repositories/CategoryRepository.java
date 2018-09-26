package de.david.cookbook.persistence.repositories;

import de.david.cookbook.persistence.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
