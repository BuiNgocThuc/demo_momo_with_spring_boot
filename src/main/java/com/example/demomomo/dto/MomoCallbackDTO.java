package com.example.demomomo.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class MomoCallbackDTO {
        @NotNull(message = "Order Type cannot be null")
        String orderType;

        @PositiveOrZero(message = "Amount must be zero or positive")
        BigDecimal amount;  // Use BigDecimal for currency values

        @NotNull(message = "Partner Code cannot be null")
        String partnerCode;

        @NotNull(message = "Order ID cannot be null")
        String orderId;

        @NotNull(message = "Extra Data cannot be null")
        private String extraData;

        @NotNull(message = "Signature cannot be null")
        String signature;

        long transId;  // This can remain as a primitive type

        long responseTime;  // This can remain as a primitive type

        int resultCode;  // This can remain as a primitive type

        @NotNull(message = "Message cannot be null")
        String message;

        @NotNull(message = "Pay Type cannot be null")
        String payType;

        @NotNull(message = "Request ID cannot be null")
        String requestId;

        @NotNull(message = "Order Info cannot be null")
        private String orderInfo;
}
