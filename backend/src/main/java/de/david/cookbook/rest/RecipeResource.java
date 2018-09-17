package de.david.cookbook.rest;

import de.david.cookbook.persistence.Category;
import de.david.cookbook.persistence.Recipe;
import de.david.cookbook.persistence.User;
import de.david.cookbook.rest.util.Util;
import de.david.cookbook.services.RecipeService;
import de.david.cookbook.services.UserService;
import org.keycloak.representations.AccessToken;
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
        AccessToken accessToken = Util.getTokenFromRequest(request);
        User user = userService.getOrCreateUserFromAccessToken(accessToken);
        return recipeService.getAllRecipesFromUser(user, filterText);
    }

    @RequestMapping(value = "recipes", method = RequestMethod.POST)
    Recipe createRecipe(HttpServletRequest request, @RequestBody LinkedHashMap<String, Object> formValue) {
        AccessToken accessToken = Util.getTokenFromRequest(request);
        User user = userService.getOrCreateUserFromAccessToken(accessToken);
        return recipeService.createRecipe(user, formValue);
    }

    @RequestMapping(value = "recipes/{recipeId}", method = RequestMethod.PUT)
    Recipe updateRecipe(HttpServletRequest request, @PathVariable Long recipeId,
                        @RequestBody LinkedHashMap<String, Object> formValue) {
        AccessToken accessToken = Util.getTokenFromRequest(request);
        return recipeService.updateRecipe(accessToken, recipeId, formValue);
    }

    @RequestMapping(value = "recipes/{recipeId}", method = RequestMethod.GET)
    Recipe readRecipesById(HttpServletRequest request, @PathVariable Long recipeId) {
        String keycloakUserId = Util.extractKeycloakUserIdFromRequest(request);
        return recipeService.getRecipeByIdAndUser(recipeId, keycloakUserId);
    }

    @RequestMapping(value = "recipes/categories", method = RequestMethod.GET)
    List<Category> readAllRecipeCategories(HttpServletRequest request) {
        return recipeService.getAllCategories();
    }
}
