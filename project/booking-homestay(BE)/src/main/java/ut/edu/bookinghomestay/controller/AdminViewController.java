package ut.edu.bookinghomestay.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ut.edu.bookinghomestay.model.Homestay;
import ut.edu.bookinghomestay.model.User;
import ut.edu.bookinghomestay.repository.BookingRepository;
import ut.edu.bookinghomestay.repository.HomestayRepository;
import ut.edu.bookinghomestay.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

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
    @GetMapping("/homestays")
    public String homestays(Model model) {
        List<Homestay> homestays = homestayRepository.findAll();
        model.addAttribute("homestays", homestays);
        return "homestays";
    }
    @GetMapping("/users")
    public String listUsers(@RequestParam(value = "keyword", required = false) String keyword, Model model) {
        List<User> users;
        if (keyword != null && !keyword.isEmpty()) {
            users = userRepository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(keyword, keyword);
        } else {
            users = userRepository.findAll();
        }

        model.addAttribute("users", users);
        model.addAttribute("keyword", keyword);
        return "users";
    }

    @GetMapping("/users/new")
    public String createUserForm(Model model) {
        model.addAttribute("user", new User());
        return "user_form";
    }

    @PostMapping("/users")
    public String saveUser(@ModelAttribute User user) {
        userRepository.save(user);
        user.setCreatedAt(LocalDateTime.now());
        return "redirect:/admin/users";
    }

    @GetMapping("/users/edit/{id}")
    public String editUserForm(@PathVariable Long id, Model model) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        model.addAttribute("user", user);
        return "user_form";
    }

    @PostMapping("/users/update")
    public String updateUser(@ModelAttribute User user) {
        userRepository.save(user);
        return "redirect:/admin/users";
    }

    @GetMapping("/users/delete/{id}")
    public String deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return "redirect:/admin/users";
    }
}
