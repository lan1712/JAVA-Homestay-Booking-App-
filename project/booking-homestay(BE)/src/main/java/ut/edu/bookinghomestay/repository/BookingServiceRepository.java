package ut.edu.bookinghomestay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ut.edu.bookinghomestay.model.BookingService;

public interface BookingServiceRepository extends JpaRepository<BookingService, Long> {
}
