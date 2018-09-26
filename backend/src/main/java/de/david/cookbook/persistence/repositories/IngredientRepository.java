package de.david.cookbook.persistence.repositories;

import de.david.cookbook.persistence.entities.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
}
