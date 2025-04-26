package ut.edu.bookinghomestay.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyRevenueDTO {
    private Integer month;
    private BigDecimal revenue;
}
