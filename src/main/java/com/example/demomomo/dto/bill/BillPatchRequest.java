package com.example.demomomo.dto.bill;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BillPatchRequest {
        String monthly;

        Float totalPrice;

        Integer oldWater;

        Integer newWater;

        LocalDateTime waterReadingDate;

        String status;


}
