package de.david.cookbook.rest.recipe.transfer;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class IngredientDTO {

    @NotNull
    private double amount;

    @NotNull
    private String unit;

    @NotNull
    @Size(max = 100)
    private String name;

    public IngredientDTO() {
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
