package de.david.cookbook.services;

import de.david.cookbook.persistence.*;
import org.keycloak.representations.AccessToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

@Service
public class RecipeService {

    private UserRepository userRepository;
    private RecipeRepository recipeRepository;
    private CategoryRepository categoryRepository;
    private UserService userService;
    private IngredientRepository ingredientRepository;
    private PermissionService permissionService;

    @Autowired
    public RecipeService(
            UserRepository userRepository,
            RecipeRepository recipeRepository,
            CategoryRepository categoryRepository,
            UserService userService,
            IngredientRepository ingredientRepository,
            PermissionService permissionService) {
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
        this.categoryRepository = categoryRepository;
        this.userService = userService;
        this.ingredientRepository = ingredientRepository;
        this.permissionService = permissionService;
    }

    public List<Recipe> getAllRecipesFromUser(String keycloakUserId) {
        List<User> user = userRepository.findByKeycloakUserId(keycloakUserId);
        return recipeRepository.findByAuthor(user.get(0));
    }

    public Recipe getRecipeByIdAndUser(Long id, String keycloakUserId) {
        Recipe recipe = recipeRepository.findOne(id);

        if (permissionService.isUserAllowedToRead(keycloakUserId, recipe)) {
            return recipeRepository.findOne(id);
        } else {
            return null; // TODO: throw Permission Exception
        }
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Recipe createRecipe(AccessToken accessToken, LinkedHashMap<String, Object> formValue) {
        User user = userService.getOrCreateUserFromAccessToken(accessToken);

        Recipe recipe = new Recipe();
        recipe.setAuthor(user);
        recipe.setName((String) formValue.get("name"));
        recipe.setDescription((String) formValue.get("description"));
        recipe.setServings(Integer.parseInt((String) formValue.get("servings")));
        recipe.setCategory(categoryRepository.findById(Long.valueOf((int) formValue.get("category"))));
        recipe.setIngredients(parseIngredients(formValue));

        recipeRepository.save(recipe);
        return recipe;
    }

    private List<Ingredient> parseIngredients(LinkedHashMap<String, Object> formValue) {
        ArrayList<Ingredient> ingredients = new ArrayList<>();

        ArrayList<LinkedHashMap<String, Object>> ingredientsList =
                (ArrayList<LinkedHashMap<String, Object>>) formValue.get("ingredients");

        for (LinkedHashMap<String, Object> ingredientEntry : ingredientsList) {
            Ingredient ingredient = generateIngredientFromEntry(ingredientEntry);
            ingredientRepository.save(ingredient);
            ingredients.add(ingredient);
        }

        return ingredients;
    }

    private Ingredient generateIngredientFromEntry(LinkedHashMap<String, Object> entry) {
        double amount = (double) (int) entry.get("amount");
        String unit = (String) entry.get("unit");
        String name = (String) entry.get("name");
        return new Ingredient(amount, unit, name);
    }
}
