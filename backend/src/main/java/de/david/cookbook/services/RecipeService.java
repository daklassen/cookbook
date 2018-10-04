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

    public Recipe createRecipe(User user, Recipe recipe) {
        List<Ingredient> ingredients = recipe.getIngredients();
        ingredientRepository.save(ingredients);

        Long categoryId = recipe.getCategory().getId();
        Category category = categoryRepository.findOne(categoryId);
        recipe.setCategory(category);

        recipe.setAuthor(user);
        recipeRepository.save(recipe);
        return recipe;
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

        if (permissionService.isUserAllowedToEditRecipe(user, recipe)) {
            return recipeRepository.findOne(id);
        } else {
            return null; // TODO: throw Permission Exception
        }
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Recipe updateRecipe(User user, Long recipeId, Recipe recipe) {
        Recipe oldRecipe = recipeRepository.findOne(recipeId);

        if (permissionService.isUserAllowedToEditRecipe(user, oldRecipe)) {

            ingredientRepository.delete(oldRecipe.getIngredients());

            oldRecipe.setIngredients(recipe.getIngredients());
            ingredientRepository.save(oldRecipe.getIngredients());
            oldRecipe.setCategory(recipe.getCategory());
            oldRecipe.setDescription(recipe.getDescription());
            oldRecipe.setImageURL(recipe.getImageURL());
            oldRecipe.setName(recipe.getName());
            oldRecipe.setServings(recipe.getServings());
            recipeRepository.save(oldRecipe);

            return recipe;
        } else {
            return null; // TODO: throw NotPermittedException
        }
    }

    public boolean deleteRecipe(User user, Long recipeId) {
        Recipe recipe = recipeRepository.findOne(recipeId);
        if (recipe != null && permissionService.isUserAllowedToEditRecipe(user, recipe)) {
            ingredientRepository.delete(recipe.getIngredients());
            recipeRepository.delete(recipe);
            return true;
        }
        return false;
    }
}
