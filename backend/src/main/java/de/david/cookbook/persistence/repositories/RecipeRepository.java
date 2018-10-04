package de.david.cookbook.persistence.repositories;

import de.david.cookbook.persistence.entities.Recipe;
import de.david.cookbook.persistence.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    List<Recipe> findByAuthor(User author);

}
