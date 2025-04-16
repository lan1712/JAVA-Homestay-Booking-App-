package ut.edu.bookinghomestay.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ut.edu.bookinghomestay.model.User;
import ut.edu.bookinghomestay.repository.UserRepository;
import ut.edu.bookinghomestay.service.UserService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
