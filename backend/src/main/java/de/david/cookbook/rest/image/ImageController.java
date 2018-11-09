package de.david.cookbook.rest.image;

import de.david.cookbook.persistence.entities.Image;
import de.david.cookbook.persistence.entities.User;
import de.david.cookbook.rest.image.transfer.ImageDTO;
import de.david.cookbook.services.ImageService;
import de.david.cookbook.services.UserService;
import de.david.cookbook.services.exceptions.ImageNotFoundException;
import de.david.cookbook.services.exceptions.NoPermissionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
public class ImageController {

    private ImageService imageService;
    private UserService userService;

    @Autowired
    public ImageController(ImageService imageService, UserService userService) {
        this.imageService = imageService;
        this.userService = userService;
    }

    @PostMapping("/image")
    public ImageDTO uploadFile(HttpServletRequest request, @RequestParam("file") MultipartFile file) throws IOException {
        User user = userService.getUserFromRequest(request);
        Image image = imageService.storeImage(file, user);
        return convertToDto(image);
    }

    @GetMapping("/image/{imageId}")
    public ResponseEntity<Resource> downloadFile(HttpServletRequest request, @PathVariable Long imageId)
            throws ImageNotFoundException, NoPermissionException {
        User user = userService.getUserFromRequest(request);
        Image image = imageService.getImage(imageId, user);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(image.getImageType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + image.getImageName() + "\"")
                .body(new ByteArrayResource(image.getData()));
    }

    public ImageDTO convertToDto(Image image) {
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/image/")
                .path(image.getId().toString())
                .toUriString();

        ImageDTO imageDTO = new ImageDTO(image.getImageName(), fileDownloadUri, image.getImageType());
        imageDTO.setId(image.getId());

        return imageDTO;
    }
}
