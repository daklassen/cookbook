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

    @RequestMapping(value = "recipes", method = RequestMethod.GET)
    List<Recipe> readAllRecipes(HttpServletRequest request, @RequestParam("filter") String filterText) {
        User user = userService.getUserFromRequest(request);
        return recipeService.getAllRecipesFromUser(user, filterText);
    }

    @RequestMapping(value = "recipes", method = RequestMethod.POST)
    Recipe createRecipe(HttpServletRequest request, @RequestBody LinkedHashMap<String, Object> formValue) {
        User user = userService.getUserFromRequest(request);
        return recipeService.createRecipe(user, formValue);
    }

    @RequestMapping(value = "recipes/{recipeId}", method = RequestMethod.PUT)
    Recipe updateRecipe(HttpServletRequest request, @PathVariable Long recipeId,
                        @RequestBody LinkedHashMap<String, Object> formValue) {
        User user = userService.getUserFromRequest(request);
        return recipeService.updateRecipe(user, recipeId, formValue);
    }

    @RequestMapping(value = "recipes/{recipeId}", method = RequestMethod.GET)
    Recipe readRecipesById(HttpServletRequest request, @PathVariable Long recipeId) {
        User user = userService.getUserFromRequest(request);
        return recipeService.getRecipeByIdAndUser(recipeId, user);
    }

    @RequestMapping(value = "recipes/categories", method = RequestMethod.GET)
    List<Category> readAllRecipeCategories(HttpServletRequest request) {
        return recipeService.getAllCategories();
    }
}
