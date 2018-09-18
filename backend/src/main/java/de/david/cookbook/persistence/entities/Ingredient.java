package de.david.cookbook.persistence.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "CB_INGREDIENT")
public class Ingredient {

    @Id
    @GeneratedValue
    @Column(name = "ID")
    private Long id;

    @Column(name = "AMOUNT")
    private double amount;

    @Column(name = "UNIT")
    private String unit;

    @Column(name = "NAME")
    private String name;

    Ingredient() {
    }

    public Ingredient(double amount, String unit, String name) {
        this.amount = amount;
        this.unit = unit;
        this.name = name;
    }

    public Long getId() {
        return id;
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
