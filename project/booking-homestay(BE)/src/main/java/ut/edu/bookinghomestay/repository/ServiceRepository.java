package ut.edu.bookinghomestay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ut.edu.bookinghomestay.model.Service;

public interface ServiceRepository extends JpaRepository<Service, Long> {
}
