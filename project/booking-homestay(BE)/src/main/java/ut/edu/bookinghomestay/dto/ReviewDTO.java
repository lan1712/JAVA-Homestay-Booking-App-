package ut.edu.bookinghomestay.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ut.edu.bookinghomestay.model.Review;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDTO {
    
    private Long id;
    private Long bookingId;
    private Long homestayId;
    private String userName;
    private String userEmail;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public static ReviewDTO fromEntity(Review review) {
        return ReviewDTO.builder()
                .id(review.getId())
                .bookingId(review.getBooking().getId())
                .homestayId(review.getBooking().getHomestay().getId())
                .userName(review.getBooking().getUser().getName())
                .userEmail(review.getBooking().getUser().getEmail())
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .updatedAt(review.getUpdatedAt())
                .build();
    }
}
