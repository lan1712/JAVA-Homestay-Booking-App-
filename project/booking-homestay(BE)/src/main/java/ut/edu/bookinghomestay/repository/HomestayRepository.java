package ut.edu.bookinghomestay.repository;

import ut.edu.bookinghomestay.model.Homestay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HomestayRepository extends JpaRepository<Homestay, Long> {

    List<Homestay> findByIsFeaturedTrue();

    List<Homestay> findByNameContainingIgnoreCaseOrLocationContainingIgnoreCase(String name, String location);

    @Query("SELECT DISTINCT h FROM Homestay h JOIN h.amenities a WHERE a.id IN :amenityIds")
    List<Homestay> findByAmenitiesIdIn(@Param("amenityIds") List<Long> amenityIds);

    @Query("SELECT DISTINCT h FROM Homestay h JOIN h.amenities a WHERE " +
            "(LOWER(h.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(h.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
            "a.id IN :amenityIds")
    List<Homestay> findByNameContainingIgnoreCaseOrLocationContainingIgnoreCaseAndAmenitiesIdIn(
            @Param("keyword") String keyword,
            @Param("location") String location,
            @Param("amenityIds") List<Long> amenityIds);
}
