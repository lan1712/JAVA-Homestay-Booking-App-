package ut.edu.bookinghomestay.repository;

import ut.edu.bookinghomestay.model.Homestay;
//import ut.edu.bookinghomestay.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HomestayRepository extends JpaRepository<Homestay, Long> {
    //List<Homestay> findByOwner(User owner);
}
