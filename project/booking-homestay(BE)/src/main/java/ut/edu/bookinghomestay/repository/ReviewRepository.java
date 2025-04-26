package ut.edu.bookinghomestay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ut.edu.bookinghomestay.model.Booking;
import ut.edu.bookinghomestay.model.Review;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<Review> findByBookingId(Long bookingId);

    @Query("SELECT r FROM Review r JOIN r.booking b WHERE b.homestay.id = :homestayId ORDER BY r.createdAt DESC")
    List<Review> findByHomestayId(@Param("homestayId") Long homestayId);

    @Query("SELECT AVG(r.rating) FROM Review r JOIN r.booking b WHERE b.homestay.id = :homestayId")
    Double getAverageRatingByHomestayId(@Param("homestayId") Long homestayId);

    @Query("SELECT COUNT(r) FROM Review r JOIN r.booking b WHERE b.homestay.id = :homestayId")
    Integer countReviewsByHomestayId(@Param("homestayId") Long homestayId);

    @Query("SELECT r FROM Review r JOIN r.booking b WHERE b.user.email = :userEmail ORDER BY r.createdAt DESC")
    List<Review> findByUserEmail(@Param("userEmail") String userEmail);
}
