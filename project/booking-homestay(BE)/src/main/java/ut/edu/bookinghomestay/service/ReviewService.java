package ut.edu.bookinghomestay.service;

import ut.edu.bookinghomestay.dto.ReviewDTO;

import java.util.List;
import java.util.Optional;

public interface ReviewService {
    
    List<ReviewDTO> getReviewsByHomestayId(Long homestayId);
    
    Optional<ReviewDTO> getReviewByBookingId(Long bookingId);
    
    ReviewDTO createReview(Long bookingId, ReviewDTO reviewDTO, String userEmail) throws Exception;
    
    ReviewDTO updateReview(Long reviewId, ReviewDTO reviewDTO, String userEmail) throws Exception;
    
    void deleteReview(Long reviewId, String userEmail) throws Exception;
    
    Double getAverageRatingByHomestayId(Long homestayId);
    
    Integer getReviewCountByHomestayId(Long homestayId);
}
