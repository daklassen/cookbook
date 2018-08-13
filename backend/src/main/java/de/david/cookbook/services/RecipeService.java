package de.david.cookbook.services;

import de.david.cookbook.persistence.*;
import org.keycloak.representations.AccessToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;

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

    public List<Recipe> getAllRecipesFromUser(String keycloakUserId, String filterText) {
        List<User> user = userRepository.findByKeycloakUserId(keycloakUserId);
        List<Recipe> recipesOfUser = recipeRepository.findByAuthor(user.get(0));

        if (filterText != null && filterText != "") {
            String filterTextLowered = filterText.toLowerCase();
            recipesOfUser = recipesOfUser.stream()
                    .filter(recipe ->
                            recipe.getCategory().getName().toLowerCase().contains(filterTextLowered) ||
                            recipe.getName().toLowerCase().contains(filterTextLowered) ||
                            recipe.getAuthor().getFirstName().toLowerCase().contains(filterTextLowered) ||
                            recipe.getAuthor().getLastName().toLowerCase().contains(filterTextLowered) ||
                            recipe.getAuthor().getEmail().toLowerCase().contains(filterTextLowered)
                    )
                    .collect(Collectors.toList());
        }

        return recipesOfUser;
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
        recipe = fillRecipeWithFormValues(recipe, user, formValue);
        recipeRepository.save(recipe);
        return recipe;
    }

    public Recipe updateRecipe(AccessToken accessToken, Long recipeId, LinkedHashMap<String, Object> formValue) {
        User user = userService.getOrCreateUserFromAccessToken(accessToken);
        Recipe recipe = recipeRepository.findById(recipeId);
        if (recipe == null) {
            // TODO: throw exception
            return null;
        }
        recipe = fillRecipeWithFormValues(recipe, user, formValue);
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

    private Recipe fillRecipeWithFormValues(Recipe recipe, User user, LinkedHashMap<String, Object> formValue) {
        recipe.setAuthor(user);
        recipe.setName((String) formValue.get("name"));
        recipe.setDescription((String) formValue.get("description"));
        recipe.setServings((int) formValue.get("servings"));
        recipe.setCategory(categoryRepository.findById(Long.valueOf((int) formValue.get("category"))));
        recipe.setIngredients(parseIngredients(formValue));
        return recipe;
    }
}
