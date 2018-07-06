package de.david.cookbook.persistence;

import javax.persistence.*;
import java.util.List;

@Entity
public class Recipe {

    @Id
    @GeneratedValue()
    private long id;
    private String name;
    @ManyToOne
    private User author;
    private String imageURL;
    private int servings;
    @Lob
    private String description;

    @ManyToOne
    private Category category;
    @OneToMany
    private List<Ingredient> ingredients;


    public Recipe() {}

    public Recipe(String name, User author, String imageURL,
                  int servings, String description,
                  Category category, List<Ingredient> ingredients) {
        this.name = name;
        this.author = author;
        this.imageURL = imageURL;
        this.servings = servings;
        this.description = description;
        this.category = category;
        this.ingredients = ingredients;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }
}
