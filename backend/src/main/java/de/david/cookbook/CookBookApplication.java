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
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;

@SpringBootApplication
public class CookBookApplication implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private UserRepository userRepository;

    // TODO: remove temporary content filling on startup
    @Override
    public void run(String... args) throws Exception {
        System.out.println();
//        Category hauptspeise = new Category("Hauptspeise");
//        Category vorspeise = new Category("Vorspeise");
//        Category nachspeise = new Category("Nachspeise");
//        categoryRepository.save(hauptspeise);
//        categoryRepository.save(vorspeise);
//        categoryRepository.save(nachspeise);
//
//        User david = new User("David", "Klassen", "david@online.de", "6563472c-04d3-43a2-9664-d2f1c4a763f3");
//        userRepository.save(david);
//
//        Category testcategory = categoryRepository.save(new Category("Testcategory"));
//        Ingredient zucker = ingredientRepository.save(new Ingredient(1, "Zucker", "Kg"));
//        Recipe recipe = new Recipe("Testrecipe 1", david, "https://image.ibb.co/hpQUy7/food_3.png", 4, "description", testcategory, Arrays.asList(zucker));
//        recipeRepository.save(recipe);
    }

    public static void main(String[] args) {
        SpringApplication.run(CookBookApplication.class, args);
    }
}
