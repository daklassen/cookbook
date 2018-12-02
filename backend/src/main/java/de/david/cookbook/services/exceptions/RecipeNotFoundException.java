package de.david.cookbook.services.exceptions;

public class RecipeNotFoundException extends Exception {
    public RecipeNotFoundException() { super(); }
    public RecipeNotFoundException(String message) { super(message); }
    public RecipeNotFoundException(String message, Throwable cause) { super(message, cause); }
    public RecipeNotFoundException(Throwable cause) { super(cause); }
}