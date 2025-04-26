package ut.edu.bookinghomestay.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;
import ut.edu.bookinghomestay.dto.HomestayDetailDTO;
import ut.edu.bookinghomestay.dto.HomestayFilterDTO;
import ut.edu.bookinghomestay.model.Homestay;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface HomestayService {
    List<Homestay> getAllHomestays();

    List<HomestayDetailDTO> getAllHomestaysWithDetails();

    Optional<HomestayDetailDTO> getHomestayWithDetails(Long id);

    List<HomestayDetailDTO> getFeaturedHomestays();

    Page<HomestayDetailDTO> searchHomestaysWithFilters(HomestayFilterDTO filter, Pageable pageable);

    List<String> uploadHomestayImages(Long homestayId, List<MultipartFile> images, Boolean isPrimary) throws IOException;

    void addAmenitiesToHomestay(Long homestayId, List<Long> amenityIds);

    Optional<Homestay> toggleFeaturedStatus(Long homestayId);
}
