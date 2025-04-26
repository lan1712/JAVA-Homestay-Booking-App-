package ut.edu.bookinghomestay.controller;

import ut.edu.bookinghomestay.model.*;
import ut.edu.bookinghomestay.repository.BookingRepository;
import ut.edu.bookinghomestay.repository.HomestayRepository;
import ut.edu.bookinghomestay.repository.UserRepository;
import ut.edu.bookinghomestay.request.BookingRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final HomestayRepository homestayRepository;

    public BookingController(BookingRepository bookingRepository, UserRepository userRepository, HomestayRepository homestayRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.homestayRepository = homestayRepository;
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request) {
        // Check User
        Optional<User> userOpt = userRepository.findById(request.getUserId());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Không tìm thấy user với ID: " + request.getUserId());
        }
        User user = userOpt.get();

        // Check Homestay
        Optional<Homestay> homestayOpt = homestayRepository.findById(request.getHomestayId());
        if (homestayOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Không tìm thấy homestay với ID: " + request.getHomestayId());
        }
        Homestay homestay = homestayOpt.get();

        // Validate ngày
        long days = ChronoUnit.DAYS.between(request.getCheckInDate(), request.getCheckOutDate());
        if (days <= 0) {
            return ResponseEntity.badRequest().body("Ngày checkout phải sau ngày checkin");
        }

        BigDecimal totalPrice = homestay.getPrice().multiply(BigDecimal.valueOf(days));

        Booking booking = Booking.builder()
                .user(user)
                .homestay(homestay)
                .checkin(request.getCheckInDate())
                .checkout(request.getCheckOutDate())
                .totalPrice(totalPrice)
                .status(BookingStatus.PENDING)
                .build();

        return ResponseEntity.ok(bookingRepository.save(booking));
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(bookingRepository.findByUser(user));
    }
}
