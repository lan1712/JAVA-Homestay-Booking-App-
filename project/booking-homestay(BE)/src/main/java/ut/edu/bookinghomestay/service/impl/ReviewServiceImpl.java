package ut.edu.bookinghomestay.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ut.edu.bookinghomestay.dto.ReviewDTO;
import ut.edu.bookinghomestay.model.Booking;
import ut.edu.bookinghomestay.model.BookingStatus;
import ut.edu.bookinghomestay.model.Review;
import ut.edu.bookinghomestay.model.User;
import ut.edu.bookinghomestay.repository.BookingRepository;
import ut.edu.bookinghomestay.repository.ReviewRepository;
import ut.edu.bookinghomestay.repository.UserRepository;
import ut.edu.bookinghomestay.service.ReviewService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ReviewDTO> getReviewsByHomestayId(Long homestayId) {
        return reviewRepository.findByHomestayId(homestayId).stream()
                .map(ReviewDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ReviewDTO> getReviewByBookingId(Long bookingId) {
        return reviewRepository.findByBookingId(bookingId)
                .map(ReviewDTO::fromEntity);
    }

    @Override
    @Transactional
    public ReviewDTO createReview(Long bookingId, ReviewDTO reviewDTO, String userEmail) throws Exception {
        // Check if booking exists
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new Exception("Booking not found"));
        
        // Check if user is the one who made the booking
        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new Exception("You can only review your own bookings");
        }
        
        // Check if booking is completed
        if (booking.getStatus() != BookingStatus.CONFIRMED) {
            throw new Exception("You can only review completed bookings");
        }
        
        // Check if review already exists
        if (reviewRepository.findByBookingId(bookingId).isPresent()) {
            throw new Exception("You have already reviewed this booking");
        }
        
        // Validate rating
        if (reviewDTO.getRating() < 1 || reviewDTO.getRating() > 5) {
            throw new Exception("Rating must be between 1 and 5");
        }
        
        // Create and save review
        Review review = Review.builder()
                .booking(booking)
                .rating(reviewDTO.getRating())
                .comment(reviewDTO.getComment())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        
        Review savedReview = reviewRepository.save(review);
        return ReviewDTO.fromEntity(savedReview);
    }

    @Override
    @Transactional
    public ReviewDTO updateReview(Long reviewId, ReviewDTO reviewDTO, String userEmail) throws Exception {
        // Check if review exists
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new Exception("Review not found"));
        
        // Check if user is the one who created the review
        if (!review.getBooking().getUser().getEmail().equals(userEmail)) {
            throw new Exception("You can only update your own reviews");
        }
        
        // Validate rating
        if (reviewDTO.getRating() < 1 || reviewDTO.getRating() > 5) {
            throw new Exception("Rating must be between 1 and 5");
        }
        
        // Update review
        review.setRating(reviewDTO.getRating());
        review.setComment(reviewDTO.getComment());
        review.setUpdatedAt(LocalDateTime.now());
        
        Review updatedReview = reviewRepository.save(review);
        return ReviewDTO.fromEntity(updatedReview);
    }

    @Override
    @Transactional
    public void deleteReview(Long reviewId, String userEmail) throws Exception {
        // Check if review exists
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new Exception("Review not found"));
        
        // Check if user is the one who created the review or an admin
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new Exception("User not found"));
        
        if (!review.getBooking().getUser().getEmail().equals(userEmail) && 
                user.getRole() != ut.edu.bookinghomestay.model.Role.ADMIN) {
            throw new Exception("You can only delete your own reviews");
        }
        
        // Delete review
        reviewRepository.delete(review);
    }

    @Override
    @Transactional(readOnly = true)
    public Double getAverageRatingByHomestayId(Long homestayId) {
        Double avgRating = reviewRepository.getAverageRatingByHomestayId(homestayId);
        return avgRating != null ? avgRating : 0.0;
    }

    @Override
    @Transactional(readOnly = true)
    public Integer getReviewCountByHomestayId(Long homestayId) {
        return reviewRepository.countReviewsByHomestayId(homestayId);
    }
}
