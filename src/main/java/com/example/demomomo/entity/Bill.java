package com.example.demomomo.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "bills")
public class Bill {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        Long id;

        @Column(nullable = false) // Assuming it's required
        String monthly;

        @Column(nullable = false) // Assuming it's required
        float totalPrice;

        Integer oldWater; // Nullable
        Integer newWater; // Nullable

        LocalDateTime waterReadingDate; // Nullable

        @Column(nullable = false) // Assuming it's required
        String status;
}
