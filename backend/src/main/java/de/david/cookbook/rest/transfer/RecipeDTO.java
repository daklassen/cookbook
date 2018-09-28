package de.david.cookbook.rest.transfer;

import javax.validation.constraints.NotNull;
import java.util.List;

public class RecipeDTO {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String userId;

    private String imageURL;

    @NotNull
    private int servings;

    @NotNull
    private String description;

    @NotNull
    private CategoryDTO categoryId;

    @NotNull
    private List<IngredientDTO> ingredients;

    public RecipeDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public int getServings() {
        return servings;
    }

    public void setServings(int servings) {
        this.servings = servings;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public CategoryDTO getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(CategoryDTO categoryId) {
        this.categoryId = categoryId;
    }

    public List<IngredientDTO> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<IngredientDTO> ingredients) {
        this.ingredients = ingredients;
    }
}
