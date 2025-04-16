package ut.edu.bookinghomestay.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HomestayResponse {
    private Long id;
    private String name;
    private String location;
    private String description;
    private String imageUrl;
    private double price;
}
