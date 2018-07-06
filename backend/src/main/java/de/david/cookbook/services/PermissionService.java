package de.david.cookbook.services;

import de.david.cookbook.persistence.Recipe;
import org.springframework.stereotype.Service;

@Service
public class PermissionService {

    public boolean isUserAllowedToRead(String keycloakUserId, Recipe recipe) {
        boolean userIsAuthorOfRecipe = recipe.getAuthor().getKeycloakUserId().equals(keycloakUserId);
        return userIsAuthorOfRecipe;
    }
}
