package ut.edu.bookinghomestay.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ut.edu.bookinghomestay.dto.ReviewDTO;
import ut.edu.bookinghomestay.model.Review;
import ut.edu.bookinghomestay.service.ReviewService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/homestay/{homestayId}")
    public ResponseEntity<List<ReviewDTO>> getHomestayReviews(@PathVariable Long homestayId) {
        return ResponseEntity.ok(reviewService.getReviewsByHomestayId(homestayId));
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<ReviewDTO> getBookingReview(@PathVariable Long bookingId) {
        return reviewService.getReviewByBookingId(bookingId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/booking/{bookingId}")
    public ResponseEntity<?> createReview(
            @PathVariable Long bookingId,
            @RequestBody ReviewDTO reviewDTO,
            Authentication authentication) {

        String userEmail = authentication.getName();
        try {
            ReviewDTO createdReview = reviewService.createReview(bookingId, reviewDTO, userEmail);
            return ResponseEntity.ok(createdReview);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateReview(
            @PathVariable Long id,
            @RequestBody ReviewDTO reviewDTO,
            Authentication authentication) {

        String userEmail = authentication.getName();
        try {
            ReviewDTO updatedReview = reviewService.updateReview(id, reviewDTO, userEmail);
            return ResponseEntity.ok(updatedReview);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(
            @PathVariable Long id,
            Authentication authentication) {

        String userEmail = authentication.getName();
        try {
            reviewService.deleteReview(id, userEmail);
            return ResponseEntity.ok(Map.of("message", "Review deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
