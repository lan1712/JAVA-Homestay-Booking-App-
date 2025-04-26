package ut.edu.bookinghomestay.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ut.edu.bookinghomestay.dto.HomestayDetailDTO;
import ut.edu.bookinghomestay.dto.HomestayFilterDTO;
import ut.edu.bookinghomestay.model.Amenity;
import ut.edu.bookinghomestay.model.Homestay;
import ut.edu.bookinghomestay.model.HomestayImage;
import ut.edu.bookinghomestay.repository.AmenityRepository;
import ut.edu.bookinghomestay.repository.HomestayImageRepository;
import ut.edu.bookinghomestay.repository.HomestayRepository;
import ut.edu.bookinghomestay.service.HomestayService;
import ut.edu.bookinghomestay.service.ImageUploadService;
import ut.edu.bookinghomestay.service.ReviewService;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HomestayServiceImpl implements HomestayService {

    private final HomestayRepository homestayRepository;
    private final HomestayImageRepository homestayImageRepository;
    private final AmenityRepository amenityRepository;
    private final ImageUploadService imageUploadService;
    private final ReviewService reviewService;

    @Override
    public List<Homestay> getAllHomestays() {
        return homestayRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<HomestayDetailDTO> getAllHomestaysWithDetails() {
        return homestayRepository.findAll().stream()
                .map(homestay -> {
                    Double avgRating = reviewService.getAverageRatingByHomestayId(homestay.getId());
                    Integer reviewCount = reviewService.getReviewCountByHomestayId(homestay.getId());
                    return HomestayDetailDTO.fromEntity(homestay, avgRating, reviewCount);
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<HomestayDetailDTO> getHomestayWithDetails(Long id) {
        return homestayRepository.findById(id)
                .map(homestay -> {
                    Double avgRating = reviewService.getAverageRatingByHomestayId(homestay.getId());
                    Integer reviewCount = reviewService.getReviewCountByHomestayId(homestay.getId());
                    return HomestayDetailDTO.fromEntity(homestay, avgRating, reviewCount);
                });
    }

    @Override
    @Transactional(readOnly = true)
    public List<HomestayDetailDTO> getFeaturedHomestays() {
        return homestayRepository.findByIsFeaturedTrue().stream()
                .map(homestay -> {
                    Double avgRating = reviewService.getAverageRatingByHomestayId(homestay.getId());
                    Integer reviewCount = reviewService.getReviewCountByHomestayId(homestay.getId());
                    return HomestayDetailDTO.fromEntity(homestay, avgRating, reviewCount);
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Page<HomestayDetailDTO> searchHomestaysWithFilters(HomestayFilterDTO filter, Pageable pageable) {
        // Build dynamic query based on filters
        List<Homestay> filteredHomestays = homestayRepository.findAll();

        // Apply keyword filter
        if (filter.getKeyword() != null && !filter.getKeyword().isEmpty()) {
            filteredHomestays = filteredHomestays.stream()
                    .filter(h -> h.getName().toLowerCase().contains(filter.getKeyword().toLowerCase()) ||
                            h.getLocation().toLowerCase().contains(filter.getKeyword().toLowerCase()) ||
                            h.getDescription().toLowerCase().contains(filter.getKeyword().toLowerCase()))
                    .collect(Collectors.toList());
        }

        // Apply amenity filter
        if (filter.getAmenityIds() != null && !filter.getAmenityIds().isEmpty()) {
            filteredHomestays = filteredHomestays.stream()
                    .filter(h -> h.getAmenities().stream()
                            .anyMatch(a -> filter.getAmenityIds().contains(a.getId())))
                    .collect(Collectors.toList());
        }

        // Apply price range filter
        if (filter.getMinPrice() != null) {
            filteredHomestays = filteredHomestays.stream()
                    .filter(h -> h.getPrice().compareTo(BigDecimal.valueOf(filter.getMinPrice())) >= 0)
                    .collect(Collectors.toList());
        }

        if (filter.getMaxPrice() != null) {
            filteredHomestays = filteredHomestays.stream()
                    .filter(h -> h.getPrice().compareTo(BigDecimal.valueOf(filter.getMaxPrice())) <= 0)
                    .collect(Collectors.toList());
        }

        // Apply location filter
        if (filter.getLocation() != null && !filter.getLocation().isEmpty()) {
            filteredHomestays = filteredHomestays.stream()
                    .filter(h -> h.getLocation().toLowerCase().contains(filter.getLocation().toLowerCase()))
                    .collect(Collectors.toList());
        }

        // Apply sorting
        if (filter.getSortBy() != null && !filter.getSortBy().isEmpty()) {
            filteredHomestays = sortHomestays(filteredHomestays, filter.getSortBy(), filter.getSortDirection());
        }

        // Convert to DTOs with ratings
        List<HomestayDetailDTO> dtos = filteredHomestays.stream()
                .map(homestay -> {
                    Double avgRating = reviewService.getAverageRatingByHomestayId(homestay.getId());
                    Integer reviewCount = reviewService.getReviewCountByHomestayId(homestay.getId());
                    return HomestayDetailDTO.fromEntity(homestay, avgRating, reviewCount);
                })
                .collect(Collectors.toList());

        // Apply pagination
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), dtos.size());

        if (start > dtos.size()) {
            return new PageImpl<>(new ArrayList<>(), pageable, dtos.size());
        }

        return new PageImpl<>(dtos.subList(start, end), pageable, dtos.size());
    }

    private List<Homestay> sortHomestays(List<Homestay> homestays, String sortBy, String sortDirection) {
        boolean isAscending = sortDirection == null || sortDirection.equalsIgnoreCase("asc");

        switch (sortBy.toLowerCase()) {
            case "price":
                return isAscending ?
                        homestays.stream().sorted((h1, h2) -> h1.getPrice().compareTo(h2.getPrice())).collect(Collectors.toList()) :
                        homestays.stream().sorted((h1, h2) -> h2.getPrice().compareTo(h1.getPrice())).collect(Collectors.toList());
            case "name":
                return isAscending ?
                        homestays.stream().sorted((h1, h2) -> h1.getName().compareTo(h2.getName())).collect(Collectors.toList()) :
                        homestays.stream().sorted((h1, h2) -> h2.getName().compareTo(h1.getName())).collect(Collectors.toList());
            case "rating":
                return isAscending ?
                        homestays.stream().sorted((h1, h2) -> {
                            Double r1 = reviewService.getAverageRatingByHomestayId(h1.getId());
                            Double r2 = reviewService.getAverageRatingByHomestayId(h2.getId());
                            return r1.compareTo(r2);
                        }).collect(Collectors.toList()) :
                        homestays.stream().sorted((h1, h2) -> {
                            Double r1 = reviewService.getAverageRatingByHomestayId(h1.getId());
                            Double r2 = reviewService.getAverageRatingByHomestayId(h2.getId());
                            return r2.compareTo(r1);
                        }).collect(Collectors.toList());
            default:
                return homestays;
        }
    }

    @Override
    @Transactional
    public List<String> uploadHomestayImages(Long homestayId, List<MultipartFile> images, Boolean isPrimary) throws IOException {
        Homestay homestay = homestayRepository.findById(homestayId)
                .orElseThrow(() -> new RuntimeException("Homestay not found"));

        List<String> imageUrls = imageUploadService.uploadImages(images);

        // If this is the primary image, update the homestay's main image URL
        if (isPrimary != null && isPrimary && !imageUrls.isEmpty()) {
            homestay.setImageUrl(imageUrls.get(0));
            homestayRepository.save(homestay);
        }

        // Save all images to the homestay_images table
        for (int i = 0; i < imageUrls.size(); i++) {
            boolean primary = (isPrimary != null && isPrimary && i == 0);

            HomestayImage homestayImage = HomestayImage.builder()
                    .homestay(homestay)
                    .imageUrl(imageUrls.get(i))
                    .isPrimary(primary)
                    .build();

            homestayImageRepository.save(homestayImage);
        }

        return imageUrls;
    }

    @Override
    @Transactional
    public void addAmenitiesToHomestay(Long homestayId, List<Long> amenityIds) {
        Homestay homestay = homestayRepository.findById(homestayId)
                .orElseThrow(() -> new RuntimeException("Homestay not found"));

        List<Amenity> amenities = amenityRepository.findAllById(amenityIds);

        for (Amenity amenity : amenities) {
            homestay.addAmenity(amenity);
        }

        homestayRepository.save(homestay);
    }

    @Override
    @Transactional
    public Optional<Homestay> toggleFeaturedStatus(Long homestayId) {
        return homestayRepository.findById(homestayId)
                .map(homestay -> {
                    homestay.setIsFeatured(!homestay.getIsFeatured());
                    return homestayRepository.save(homestay);
                });
    }
}
