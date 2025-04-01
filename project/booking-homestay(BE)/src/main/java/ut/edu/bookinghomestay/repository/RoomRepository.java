package ut.edu.bookinghomestay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ut.edu.bookinghomestay.model.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {

}
