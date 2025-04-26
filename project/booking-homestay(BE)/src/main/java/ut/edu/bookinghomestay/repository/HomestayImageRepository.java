package ut.edu.bookinghomestay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ut.edu.bookinghomestay.model.Homestay;
import ut.edu.bookinghomestay.model.HomestayImage;

import java.util.List;
import java.util.Optional;

public interface HomestayImageRepository extends JpaRepository<HomestayImage, Long> {
    
    List<HomestayImage> findByHomestay(Homestay homestay);
    
    List<HomestayImage> findByHomestayOrderByIsPrimaryDesc(Homestay homestay);
    
    Optional<HomestayImage> findByHomestayAndIsPrimaryTrue(Homestay homestay);
}
