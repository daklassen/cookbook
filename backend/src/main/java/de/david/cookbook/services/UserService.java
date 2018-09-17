package de.david.cookbook.services;

import de.david.cookbook.persistence.User;
import de.david.cookbook.persistence.UserRepository;
import de.david.cookbook.rest.util.Util;
import org.keycloak.representations.AccessToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserFromRequest(HttpServletRequest request) {
        AccessToken accessToken = Util.getTokenFromRequest(request);
        return this.getOrCreateUserFromAccessToken(accessToken);
    }

    public User getOrCreateUserFromAccessToken(AccessToken accessToken) {
        List<User> userList = userRepository.findByKeycloakUserId(accessToken.getSubject());

        if (userList.isEmpty()) {
            return createUserFromAccessToken(accessToken);
        }

        return userList.get(0);
    }

    private User createUserFromAccessToken(AccessToken accessToken) {
        User newUser = new User();
        newUser.setEmail(accessToken.getEmail());
        newUser.setFirstName(accessToken.getGivenName());
        newUser.setLastName(accessToken.getFamilyName());
        newUser.setKeycloakUserId(accessToken.getSubject());

        userRepository.save(newUser);
        return newUser;
    }
}
