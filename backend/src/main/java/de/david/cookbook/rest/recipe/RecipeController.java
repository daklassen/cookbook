package de.david.cookbook.rest.recipe;

import de.david.cookbook.persistence.entities.Category;
import de.david.cookbook.persistence.entities.Recipe;
import de.david.cookbook.persistence.entities.User;
import de.david.cookbook.rest.recipe.transfer.RecipeDTO;
import de.david.cookbook.services.RecipeService;
import de.david.cookbook.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class RecipeController {

    private RecipeService recipeService;

    private UserService userService;

    private ModelMapper modelMapper;

    @Autowired
    public RecipeController(RecipeService recipeService, UserService userService, ModelMapper modelMapper) {
        this.recipeService = recipeService;
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @GetMapping(value = "recipes")
    List<RecipeDTO> getAllRecipes(HttpServletRequest request, @RequestParam("filter") String filterText) {
        User user = userService.getUserFromRequest(request);
        List<Recipe> recipes = recipeService.getAllRecipesFromUser(user, filterText);
        return recipes.stream()
                .map(recipe -> convertToDto(recipe))
                .collect(Collectors.toList());
    }

    @PostMapping(value = "recipes")
    RecipeDTO createRecipe(HttpServletRequest request, @RequestBody @Valid RecipeDTO recipeDTO) {
        User user = userService.getUserFromRequest(request);
        Recipe recipe = convertToEntity(recipeDTO);
        RecipeDTO recipeDTOCreated = convertToDto(recipeService.createRecipe(user, recipe));
        return recipeDTOCreated;
    }

    @PutMapping(value = "recipes/{recipeId}")
    RecipeDTO updateRecipe(HttpServletRequest request, @PathVariable Long recipeId,
                        @RequestBody @Valid RecipeDTO recipeDTO) {
        User user = userService.getUserFromRequest(request);
        Recipe recipe = convertToEntity(recipeDTO);
        RecipeDTO recipeDTOupdated = convertToDto(recipeService.updateRecipe(user, recipeId, recipe));
        return recipeDTOupdated;
    }

    @GetMapping(value = "recipes/{recipeId}")
    RecipeDTO getRecipeById(HttpServletRequest request, @PathVariable Long recipeId) {
        User user = userService.getUserFromRequest(request);
        RecipeDTO recipeDTO = convertToDto(recipeService.getRecipeByIdAndUser(recipeId, user));
        return recipeDTO;
    }

    @GetMapping(value = "recipes/categories")
    List<Category> getAllRecipeCategories(HttpServletRequest request) {
        return recipeService.getAllCategories();
    }

    private RecipeDTO convertToDto(Recipe recipe) {
        RecipeDTO recipeDTO = modelMapper.map(recipe, RecipeDTO.class);
        return recipeDTO;
    }

    private Recipe convertToEntity(RecipeDTO recipeDTO) {
        Recipe recipe = modelMapper.map(recipeDTO, Recipe.class);
        Category category = new Category();
        category.setId(recipeDTO.getCategoryId());
        recipe.setCategory(category);
        return recipe;
    }
}
