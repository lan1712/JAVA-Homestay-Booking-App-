package ut.edu.bookinghomestay.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "homestays")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Homestay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String location;

    @Column(columnDefinition = "TEXT")
    private String description;

    private BigDecimal price;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;

    @Column(name = "is_featured")
    private Boolean isFeatured;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    // Relationship with HomestayImage
    @OneToMany(mappedBy = "homestay", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<HomestayImage> images = new ArrayList<>();

    // Relationship with Amenity
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "homestay_amenities",
            joinColumns = @JoinColumn(name = "homestay_id"),
            inverseJoinColumns = @JoinColumn(name = "amenity_id")
    )
    @Builder.Default
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<Amenity> amenities = new HashSet<>();

    // Relationship with Booking
    @OneToMany(mappedBy = "homestay")
    @Builder.Default
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Booking> bookings = new ArrayList<>();

    // Helper methods for managing relationships
    public void addImage(HomestayImage image) {
        images.add(image);
        image.setHomestay(this);
    }

    public void removeImage(HomestayImage image) {
        images.remove(image);
        image.setHomestay(null);
    }

    public void addAmenity(Amenity amenity) {
        amenities.add(amenity);
        amenity.getHomestays().add(this);
    }

    public void removeAmenity(Amenity amenity) {
        amenities.remove(amenity);
        amenity.getHomestays().remove(this);
    }
}
