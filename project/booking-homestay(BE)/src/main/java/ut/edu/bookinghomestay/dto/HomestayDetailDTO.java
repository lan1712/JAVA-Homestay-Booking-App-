package ut.edu.bookinghomestay.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ut.edu.bookinghomestay.model.Homestay;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HomestayDetailDTO {
    
    private Long id;
    private String name;
    private String location;
    private String description;
    private BigDecimal price;
    private String mainImageUrl;
    private Boolean isFeatured;
    private LocalDateTime createdAt;
    private List<ImageDTO> images;
    private Set<AmenityDTO> amenities;
    private Double averageRating;
    private Integer reviewCount;
    
    // Static method to convert Homestay entity to DTO
    public static HomestayDetailDTO fromEntity(Homestay homestay, Double averageRating, Integer reviewCount) {
        List<ImageDTO> imageDTOs = homestay.getImages().stream()
                .map(image -> new ImageDTO(image.getId(), image.getImageUrl(), image.getIsPrimary()))
                .collect(Collectors.toList());
                
        Set<AmenityDTO> amenityDTOs = homestay.getAmenities().stream()
                .map(amenity -> new AmenityDTO(amenity.getId(), amenity.getName(), amenity.getIcon(), amenity.getCategory()))
                .collect(Collectors.toSet());
                
        return HomestayDetailDTO.builder()
                .id(homestay.getId())
                .name(homestay.getName())
                .location(homestay.getLocation())
                .description(homestay.getDescription())
                .price(homestay.getPrice())
                .mainImageUrl(homestay.getImageUrl())
                .isFeatured(homestay.getIsFeatured())
                .createdAt(homestay.getCreatedAt())
                .images(imageDTOs)
                .amenities(amenityDTOs)
                .averageRating(averageRating)
                .reviewCount(reviewCount)
                .build();
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ImageDTO {
        private Long id;
        private String url;
        private Boolean isPrimary;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AmenityDTO {
        private Long id;
        private String name;
        private String icon;
        private String category;
    }
}
