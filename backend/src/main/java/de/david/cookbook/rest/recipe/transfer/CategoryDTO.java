package de.david.cookbook.rest.recipe.transfer;

import javax.validation.constraints.NotNull;

public class CategoryDTO {

    private Long id;

    @NotNull
    private String name;

    public CategoryDTO() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }
}
