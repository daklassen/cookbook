package de.david.cookbook.services;

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

    private boolean isUserAuthorOfRecipe(User user, Recipe recipe) {
        User author = recipe.getAuthor();
        return author.getKeycloakUserId().equals(user.getKeycloakUserId());
    }
}
