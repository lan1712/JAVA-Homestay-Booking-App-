package ut.edu.bookinghomestay.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ut.edu.bookinghomestay.model.Homestay;
import ut.edu.bookinghomestay.repository.HomestayRepository;
import ut.edu.bookinghomestay.service.HomestayService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HomestayServiceImpl implements HomestayService {

    private final HomestayRepository homestayRepository;

    @Override
    public List<Homestay> getAllHomestays() {
        return homestayRepository.findAll();
    }
}
