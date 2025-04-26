package ut.edu.bookinghomestay.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ut.edu.bookinghomestay.dto.HomestayDetailDTO;
import ut.edu.bookinghomestay.dto.HomestayFilterDTO;
import ut.edu.bookinghomestay.model.Homestay;
import ut.edu.bookinghomestay.repository.HomestayRepository;
import ut.edu.bookinghomestay.request.HomestayRequest;
import ut.edu.bookinghomestay.service.HomestayService;
import ut.edu.bookinghomestay.service.ImageUploadService;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/homestays")
@RequiredArgsConstructor
public class HomestayController {

    private final HomestayRepository homestayRepository;
    private final HomestayService homestayService;
    private final ImageUploadService imageUploadService;

    @GetMapping
    public List<Homestay> getAll() {
        return homestayRepository.findAll();
    }

    @GetMapping("/details")
    public ResponseEntity<List<HomestayDetailDTO>> getAllWithDetails() {
        return ResponseEntity.ok(homestayService.getAllHomestaysWithDetails());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HomestayDetailDTO> getHomestayDetails(@PathVariable Long id) {
        return homestayService.getHomestayWithDetails(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/featured")
    public ResponseEntity<List<HomestayDetailDTO>> getFeaturedHomestays() {
        return ResponseEntity.ok(homestayService.getFeaturedHomestays());
    }

    @GetMapping("/search")
    public ResponseEntity<Page<HomestayDetailDTO>> searchHomestays(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) List<Long> amenities,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String sortDirection,
            @PageableDefault(size = 10) Pageable pageable) {

        HomestayFilterDTO filter = HomestayFilterDTO.builder()
                .keyword(keyword)
                .amenityIds(amenities)
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .location(location)
                .sortBy(sortBy)
                .sortDirection(sortDirection)
                .build();

        Page<HomestayDetailDTO> results = homestayService.searchHomestaysWithFilters(filter, pageable);
        return ResponseEntity.ok(results);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody HomestayRequest request) {
        Homestay homestay = Homestay.builder()
                .name(request.getName())
                .location(request.getLocation())
                .description(request.getDescription())
                .price(request.getPrice())
                .imageUrl(request.getImageUrl())
                .isFeatured(false)
                .build();

        return ResponseEntity.ok(homestayRepository.save(homestay));
    }

    @PostMapping("/{id}/images")
    public ResponseEntity<?> uploadImages(
            @PathVariable Long id,
            @RequestParam("images") List<MultipartFile> images,
            @RequestParam(value = "isPrimary", required = false) Boolean isPrimary) {

        try {
            List<String> imageUrls = homestayService.uploadHomestayImages(id, images, isPrimary);
            return ResponseEntity.ok(Map.of("imageUrls", imageUrls));
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Failed to upload images: " + e.getMessage());
        }
    }

    @PostMapping("/{id}/amenities")
    public ResponseEntity<?> addAmenities(
            @PathVariable Long id,
            @RequestBody List<Long> amenityIds) {

        try {
            homestayService.addAmenitiesToHomestay(id, amenityIds);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add amenities: " + e.getMessage());
        }
    }

    @PostMapping("/{id}/toggle-featured")
    public ResponseEntity<?> toggleFeatured(@PathVariable Long id) {
        return homestayService.toggleFeaturedStatus(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
