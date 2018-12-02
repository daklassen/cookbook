package de.david.cookbook;

import de.david.cookbook.persistence.entities.Category;
import de.david.cookbook.persistence.entities.Ingredient;
import de.david.cookbook.persistence.entities.Recipe;
import de.david.cookbook.persistence.entities.User;
import de.david.cookbook.persistence.repositories.CategoryRepository;
import de.david.cookbook.persistence.repositories.IngredientRepository;
import de.david.cookbook.persistence.repositories.RecipeRepository;
import de.david.cookbook.persistence.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class SampleData {

    private CategoryRepository categoryRepository;
    private RecipeRepository recipeRepository;
    private IngredientRepository ingredientRepository;
    private UserRepository userRepository;

    @Autowired
    public SampleData(CategoryRepository categoryRepository,
                      RecipeRepository recipeRepository,
                      IngredientRepository ingredientRepository,
                      UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
        this.userRepository = userRepository;
    }

    public void createSampleData() {
        Category hauptspeise = new Category("Hauptspeise");
        Category vorspeise = new Category("Vorspeise");
        Category nachspeise = new Category("Nachspeise");
        categoryRepository.save(hauptspeise);
        categoryRepository.save(vorspeise);
        categoryRepository.save(nachspeise);

        User david = new User("David", "Klassen", "david@online.de", "7fb96b6b-175b-4f06-bf76-64b451b27086");
        userRepository.save(david);

        Category testcategory = categoryRepository.save(new Category("Testcategory"));
        Ingredient zucker = ingredientRepository.save(new Ingredient(1, "Zucker", "Kg"));
        Recipe recipe = new Recipe("Testrecipe 1", david, 4, "description", testcategory, Arrays.asList(zucker), null);
        recipeRepository.save(recipe);
    }
}
