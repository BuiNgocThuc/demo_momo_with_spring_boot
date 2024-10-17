package com.example.demomomo.configuration;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Component
@ConfigurationProperties(prefix = "momo")
public class MomoSettings {
        @NotNull(message = "MoMo API URL cannot be null")
        String momoApiUrl;

        @NotNull(message = "Secret Key cannot be null")
        String secretKey;

        @NotNull(message = "Access Key cannot be null")
        String accessKey;

        @NotNull(message = "Return URL cannot be null")
        String returnUrl;

        @NotNull(message = "Notify URL cannot be null")
        String notifyUrl;

        @NotNull(message = "Partner Code cannot be null")
        String partnerCode;
}
