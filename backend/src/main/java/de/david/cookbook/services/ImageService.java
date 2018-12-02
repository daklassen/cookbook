package de.david.cookbook.services;

import de.david.cookbook.persistence.entities.Image;
import de.david.cookbook.persistence.entities.User;
import de.david.cookbook.persistence.repositories.ImageRepository;
import de.david.cookbook.services.exceptions.ImageNotFoundException;
import de.david.cookbook.services.exceptions.NoPermissionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImageService {

    private ImageRepository imageRepository;
    private PermissionService permissionService;

    @Autowired
    public ImageService(ImageRepository imageRepository, PermissionService permissionService) {
        this.imageRepository = imageRepository;
        this.permissionService = permissionService;
    }

    public Image storeImage(MultipartFile file, User user) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        if (fileName.contains(".."))
            throw new IOException("Sorry! Filename contains invalid path sequence " + fileName);

        Image imageFile = new Image(user, fileName, file.getContentType(), file.getBytes());

        return imageRepository.save(imageFile);
    }

    public Image getImage(Long fileId, User user) throws ImageNotFoundException, NoPermissionException {
        Image image = imageRepository.findOne(fileId);

        if (image == null)
            throw new ImageNotFoundException("Could not find image with id " + fileId);

        if (!permissionService.isUserAllowedToSeeImage(user, image))
            throw new NoPermissionException("User " + user.getEmail() + " is not allowed to load image with id " + fileId);

        return image;
    }
}
