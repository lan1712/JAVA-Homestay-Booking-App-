package ut.edu.bookinghomestay.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingRequest {
    private Long homestayId;
    private Long userId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int numberOfGuests;
}
