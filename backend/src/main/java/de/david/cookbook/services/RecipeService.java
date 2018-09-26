package de.david.cookbook.services;

import de.david.cookbook.persistence.entities.Category;
import de.david.cookbook.persistence.entities.Ingredient;
import de.david.cookbook.persistence.entities.Recipe;
import de.david.cookbook.persistence.entities.User;
import de.david.cookbook.persistence.repositories.CategoryRepository;
import de.david.cookbook.persistence.repositories.IngredientRepository;
import de.david.cookbook.persistence.repositories.RecipeRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecipeService {

    private RecipeRepository recipeRepository;
    private CategoryRepository categoryRepository;
    private IngredientRepository ingredientRepository;
    private PermissionService permissionService;

    @Autowired
    public RecipeService(
            RecipeRepository recipeRepository,
            CategoryRepository categoryRepository,
            IngredientRepository ingredientRepository,
            PermissionService permissionService) {
        this.recipeRepository = recipeRepository;
        this.categoryRepository = categoryRepository;
        this.ingredientRepository = ingredientRepository;
        this.permissionService = permissionService;
    }

    public List<Recipe> getAllRecipesFromUser(User user, String filterText) {
        List<Recipe> recipesOfUser = recipeRepository.findByAuthor(user);

        if (StringUtils.isNotEmpty(filterText)) {
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

    public Recipe getRecipeByIdAndUser(Long id, User user) {
        Recipe recipe = recipeRepository.findOne(id);

        if (permissionService.isUserAllowedToReadRecipe(user, recipe)) {
            return recipeRepository.findOne(id);
        } else {
            return null; // TODO: throw Permission Exception
        }
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Recipe createRecipe(User user, LinkedHashMap<String, Object> formValue) {

        Recipe recipe = new Recipe();
        fillRecipeWithFormValues(recipe, user, formValue);
        recipeRepository.save(recipe);
        return recipe;
    }

    public Recipe updateRecipe(User user, Long recipeId, LinkedHashMap<String, Object> formValue) {
        Recipe recipe = recipeRepository.findOne(recipeId);
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
        recipe.setCategory(categoryRepository.findOne(Long.valueOf((int) formValue.get("category"))));
        recipe.setIngredients(parseIngredients(formValue));
        return recipe;
    }
}
