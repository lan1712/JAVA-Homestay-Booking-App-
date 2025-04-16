package ut.edu.bookinghomestay.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class HomestayRequest {
    private String name;
    private String location;
    private String description;
    private BigDecimal price;
    private String imageUrl;
}
