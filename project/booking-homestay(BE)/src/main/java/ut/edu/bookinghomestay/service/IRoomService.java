package ut.edu.bookinghomestay.service;

import org.springframework.web.multipart.MultipartFile;
import ut.edu.bookinghomestay.model.Room;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;

public interface IRoomService {
    Room addNewroom(MultipartFile photo, String roomType, BigDecimal roomPrice) throws SQLException, IOException;
}
