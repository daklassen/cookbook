package de.david.cookbook.services;

import de.david.cookbook.persistence.entities.Category;
import de.david.cookbook.persistence.entities.Ingredient;
import de.david.cookbook.persistence.entities.Recipe;
import de.david.cookbook.persistence.entities.User;
import de.david.cookbook.persistence.repositories.CategoryRepository;
import de.david.cookbook.persistence.repositories.IngredientRepository;
import de.david.cookbook.persistence.repositories.RecipeRepository;
import de.david.cookbook.services.exceptions.RecipeNotFoundException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.NoPermissionException;
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

    public Recipe getRecipeByIdAndUser(Long id, User user) throws NoPermissionException, RecipeNotFoundException {
        Recipe recipe = recipeRepository.findOne(id);
        if (recipe == null) throw new RecipeNotFoundException("Could not find recipe with id " + id);
        this.checkReadPermission(user, recipe);
        return recipe;
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Recipe updateRecipe(User user, Long recipeId, Recipe recipe)
            throws NoPermissionException, RecipeNotFoundException {
        Recipe oldRecipe = recipeRepository.findOne(recipeId);
        if (recipe == null) throw new RecipeNotFoundException("Could not find recipe with id " + recipeId);
        this.checkEditPermission(user, recipe);

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
    }

    public Recipe deleteRecipe(User user, Long recipeId) throws NoPermissionException, RecipeNotFoundException {
        Recipe recipe = recipeRepository.findOne(recipeId);
        if (recipe == null) throw new RecipeNotFoundException("Could not find recipe with id " + recipeId);
        this.checkEditPermission(user, recipe);

        ingredientRepository.delete(recipe.getIngredients());
        recipeRepository.delete(recipe);
        return recipe;
    }

    private void checkReadPermission(User user, Recipe recipe) throws NoPermissionException {
        if (!permissionService.isUserAllowedToReadRecipe(user, recipe)) {
            throw new NoPermissionException("User " + user.getEmail()
                    + " is not permitted to read recipe " + recipe.getId());
        }
    }

    private void checkEditPermission(User user, Recipe recipe) throws NoPermissionException {
        if (!permissionService.isUserAllowedToEditRecipe(user, recipe)) {
            throw new NoPermissionException("User " + user.getEmail()
                    + " is not permitted to edit recipe " + recipe.getId());
        }
    }
}
