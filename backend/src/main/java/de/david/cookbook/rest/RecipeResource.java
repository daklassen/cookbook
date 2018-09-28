package de.david.cookbook.rest;

import de.david.cookbook.persistence.entities.Category;
import de.david.cookbook.persistence.entities.Recipe;
import de.david.cookbook.persistence.entities.User;
import de.david.cookbook.services.RecipeService;
import de.david.cookbook.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
public class RecipeResource {

    private RecipeService recipeService;

    private UserService userService;

    @Autowired
    public RecipeResource(RecipeService recipeService, UserService userService) {
        this.recipeService = recipeService;
        this.userService = userService;
    }

    @GetMapping(value = "recipes")
    List<Recipe> readAllRecipes(HttpServletRequest request, @RequestParam("filter") String filterText) {
        User user = userService.getUserFromRequest(request);
        return recipeService.getAllRecipesFromUser(user, filterText);
    }

    @PostMapping(value = "recipes")
    Recipe createRecipe(HttpServletRequest request, @RequestBody LinkedHashMap<String, Object> formValue) {
        User user = userService.getUserFromRequest(request);
        return recipeService.createRecipe(user, formValue);
    }

    @PutMapping(value = "recipes/{recipeId}")
    Recipe updateRecipe(HttpServletRequest request, @PathVariable Long recipeId,
                        @RequestBody LinkedHashMap<String, Object> formValue) {
        User user = userService.getUserFromRequest(request);
        return recipeService.updateRecipe(user, recipeId, formValue);
    }

    @GetMapping(value = "recipes/{recipeId}")
    Recipe readRecipesById(HttpServletRequest request, @PathVariable Long recipeId) {
        User user = userService.getUserFromRequest(request);
        return recipeService.getRecipeByIdAndUser(recipeId, user);
    }

    @GetMapping(value = "recipes/categories")
    List<Category> readAllRecipeCategories(HttpServletRequest request) {
        return recipeService.getAllCategories();
    }
}
