package ut.edu.bookinghomestay.controller;

import ut.edu.bookinghomestay.model.Homestay;
import ut.edu.bookinghomestay.model.User;
import ut.edu.bookinghomestay.repository.HomestayRepository;
import ut.edu.bookinghomestay.repository.UserRepository;
import ut.edu.bookinghomestay.request.HomestayRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/homestays")
public class HomestayController {

    private final HomestayRepository homestayRepository;
    private final UserRepository userRepository;

    public HomestayController(HomestayRepository homestayRepository, UserRepository userRepository) {
        this.homestayRepository = homestayRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Homestay> getAll() {
        return homestayRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody HomestayRequest request) {
        Homestay homestay = Homestay.builder()
                .name(request.getName())
                .location(request.getLocation())
                .description(request.getDescription())
                .price(request.getPrice())
                .imageUrl(request.getImageUrl())
                .build();

        return ResponseEntity.ok(homestayRepository.save(homestay));
    }

}
