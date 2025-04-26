package ut.edu.bookinghomestay.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ut.edu.bookinghomestay.model.Amenity;
import ut.edu.bookinghomestay.repository.AmenityRepository;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/amenities")
@RequiredArgsConstructor
public class AmenityController {

    private final AmenityRepository amenityRepository;

    @GetMapping
    public ResponseEntity<List<Amenity>> getAllAmenities() {
        return ResponseEntity.ok(amenityRepository.findAll());
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Amenity>> getAmenitiesByCategory(@RequestParam String category) {
        return ResponseEntity.ok(amenityRepository.findByCategory(category));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Amenity> getAmenityById(@PathVariable Long id) {
        return amenityRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Amenity> createAmenity(@RequestBody Amenity amenity) {
        return ResponseEntity.ok(amenityRepository.save(amenity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAmenity(@PathVariable Long id, @RequestBody Amenity amenityDetails) {
        return amenityRepository.findById(id)
                .map(amenity -> {
                    amenity.setName(amenityDetails.getName());
                    amenity.setIcon(amenityDetails.getIcon());
                    amenity.setCategory(amenityDetails.getCategory());
                    return ResponseEntity.ok(amenityRepository.save(amenity));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAmenity(@PathVariable Long id) {
        return amenityRepository.findById(id)
                .map(amenity -> {
                    amenityRepository.delete(amenity);
                    return ResponseEntity.ok(Map.of("message", "Amenity deleted successfully"));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
