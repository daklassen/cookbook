package de.david.cookbook.rest;

import de.david.cookbook.persistence.Category;
import de.david.cookbook.persistence.Recipe;
import de.david.cookbook.rest.util.Util;
import de.david.cookbook.services.RecipeService;
import org.keycloak.representations.AccessToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
public class RecipeResource {

    private RecipeService recipeService;

    @Autowired
    public RecipeResource(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @RequestMapping(value = "recipes", method = RequestMethod.GET)
    List<Recipe> readAllRecipes(HttpServletRequest request) {
        String keycloakUserId = Util.extractKeycloakUserIdFromRequest(request);
        return recipeService.getAllRecipesFromUser(keycloakUserId);
    }

    @RequestMapping(value = "recipes", method = RequestMethod.POST)
    Recipe createRecipe(HttpServletRequest request, @RequestBody LinkedHashMap<String, Object> formValue) {
        AccessToken accessToken = Util.getTokenFromRequest(request);
        return recipeService.createRecipe(accessToken, formValue);
    }

    @RequestMapping(value = "recipes/{recipeId}", method = RequestMethod.PUT)
    Recipe updateRecipe(HttpServletRequest request, @PathVariable Long recipeId, @RequestBody LinkedHashMap<String, Object> formValue) {
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
        List<Category> categories = recipeService.getAllCategories();
        return recipeService.getAllCategories();
    }
}
