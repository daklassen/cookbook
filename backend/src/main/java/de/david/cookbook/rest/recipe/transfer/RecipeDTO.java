package de.david.cookbook.rest.recipe.transfer;

import de.david.cookbook.rest.image.transfer.ImageDTO;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class RecipeDTO {

    private Long id;

    @NotNull
    @Size(max = 100)
    private String name;

    private UserDTO author;

    private ImageDTO imageFile;

    @NotNull
    @Min(1)
    @Max(20)
    private int servings;

    @NotNull
    @Size(max = 1000)
    private String description;

    @NotNull
    private Long categoryId;

    @NotNull
    @Valid
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

    public UserDTO getAuthor() {
        return author;
    }

    public void setAuthor(UserDTO author) {
        this.author = author;
    }

    public ImageDTO getImageFile() {
        return imageFile;
    }

    public void setImageFile(ImageDTO imageFile) {
        this.imageFile = imageFile;
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

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public List<IngredientDTO> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<IngredientDTO> ingredients) {
        this.ingredients = ingredients;
    }
}
