package com.example.demomomo.dto.bill;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BillResponse {
        Integer id;

        String monthly;

        Float totalPrice;

        Integer oldWater;

        Integer newWater;

        LocalDateTime waterReadingDate;

        String status;

        LocalDateTime createdAt;

        LocalDateTime updatedAt;

        Integer relationshipId;
}
