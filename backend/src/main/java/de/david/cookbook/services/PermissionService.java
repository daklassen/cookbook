package de.david.cookbook.services;

import de.david.cookbook.persistence.entities.Image;
import de.david.cookbook.persistence.entities.Recipe;
import de.david.cookbook.persistence.entities.User;
import org.springframework.stereotype.Service;

@Service
public class PermissionService {

    public boolean isUserAllowedToReadRecipe(User user, Recipe recipe) {
        return isUserAuthorOfRecipe(user, recipe);
    }

    public boolean isUserAllowedToEditRecipe(User user, Recipe recipe) {
        return isUserAuthorOfRecipe(user, recipe);
    }

    public boolean isUserAllowedToSeeImage(User user, Image image) {
        return isUserAuthorOfImage(user, image);
    }

    private boolean isUserAuthorOfRecipe(User user, Recipe recipe) {
        User author = recipe.getAuthor();
        return author.getKeycloakUserId().equals(user.getKeycloakUserId());
    }

    private boolean isUserAuthorOfImage(User user, Image image) {
        User author = image.getAuthor();
        return author.getKeycloakUserId().equals(user.getKeycloakUserId());
    }
}
