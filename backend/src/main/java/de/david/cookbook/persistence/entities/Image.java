package de.david.cookbook.persistence.entities;

import javax.persistence.*;

@Entity(name = "CB_IMAGE")
public class Image {

    @Id
    @GeneratedValue
    @Column(name = "ID")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "IMAGE_AUTHOR", nullable = false)
    private User author;

    @Column(name = "IMAGE_NAME", nullable = false)
    private String imageName;

    @Column(name = "IMAGE_TYPE", nullable = false)
    private String imageType;

    @Lob
    @Column(name = "IMAGE_DATA", nullable = false)
    private byte[] data;

    public Image() {
    }

    public Image(User author, String imageName, String imageType, byte[] data) {
        this.author = author;
        this.imageName = imageName;
        this.imageType = imageType;
        this.data = data;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }
}
