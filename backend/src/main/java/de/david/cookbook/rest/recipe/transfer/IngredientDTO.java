package de.david.cookbook.rest.recipe.transfer;

import javax.validation.constraints.NotNull;

public class IngredientDTO {

    private Long id;

    @NotNull
    private double amount;

    @NotNull
    private String unit;

    @NotNull
    private String name;

    public IngredientDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
