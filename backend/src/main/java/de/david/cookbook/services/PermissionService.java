package de.david.cookbook.services;

import de.david.cookbook.persistence.Recipe;
import de.david.cookbook.persistence.User;
import org.springframework.stereotype.Service;

@Service
public class PermissionService {

    public boolean isUserAllowedToReadRecipe(User user, Recipe recipe) {
        boolean userIsAuthorOfRecipe = recipe.getAuthor().getKeycloakUserId().equals(user.getKeycloakUserId());
        return userIsAuthorOfRecipe;
    }
}
