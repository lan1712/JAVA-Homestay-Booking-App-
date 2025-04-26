package ut.edu.bookinghomestay.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HomestayFilterDTO {

    private String keyword;
    private List<Long> amenityIds;
    private Double minPrice;
    private Double maxPrice;
    private String location;
    private String sortBy;
    private String sortDirection;
}
