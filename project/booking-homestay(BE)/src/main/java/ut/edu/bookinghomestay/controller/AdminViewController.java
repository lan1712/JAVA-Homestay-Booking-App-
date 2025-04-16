package ut.edu.bookinghomestay.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ut.edu.bookinghomestay.repository.BookingRepository;
import ut.edu.bookinghomestay.repository.HomestayRepository;
import ut.edu.bookinghomestay.repository.UserRepository;

@Controller
@RequestMapping("/admin")
public class AdminViewController {

    private final UserRepository userRepository;
    private final HomestayRepository homestayRepository;
    private final BookingRepository bookingRepository;

    public AdminViewController(UserRepository userRepository,
                               HomestayRepository homestayRepository,
                               BookingRepository bookingRepository) {
        this.userRepository = userRepository;
        this.homestayRepository = homestayRepository;
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        long totalUsers = userRepository.count();
        long totalHomestays = homestayRepository.count();
        long totalBookings = bookingRepository.count();

        model.addAttribute("totalUsers", totalUsers);
        model.addAttribute("totalHomestays", totalHomestays);
        model.addAttribute("totalBookings", totalBookings);

        return "dashboard";
    }
}
