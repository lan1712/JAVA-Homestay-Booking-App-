package ut.edu.bookinghomestay.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import ut.edu.bookinghomestay.model.User;
import ut.edu.bookinghomestay.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Lấy danh sách tất cả user - chỉ ADMIN mới được xem
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Email đã được sử dụng");
        }
        return ResponseEntity.ok(userRepository.save(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello user!");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/dashboard")
    public ResponseEntity<String> dashboard() {
        return ResponseEntity.ok("Admin Dashboard");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<String> deleteUser(@PathVariable Long id, Authentication authentication) {
        String currentEmail = authentication.getName();

        return userRepository.findById(id).map(user -> {
            // Nếu là ADMIN hoặc chính mình thì cho xóa
            if (authentication.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"))
                    || user.getEmail().equals(currentEmail)) {
                userRepository.deleteById(id);
                return ResponseEntity.ok("Xóa user thành công");
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền xóa user này");
            }
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy user để xóa"));
    }
}
