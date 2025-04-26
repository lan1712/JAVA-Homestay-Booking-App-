package ut.edu.bookinghomestay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ut.edu.bookinghomestay.model.Amenity;

import java.util.List;

public interface AmenityRepository extends JpaRepository<Amenity, Long> {
    
    List<Amenity> findByCategory(String category);
    
    List<Amenity> findByNameContainingIgnoreCase(String name);
}
