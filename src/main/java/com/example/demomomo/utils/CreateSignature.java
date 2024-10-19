package com.example.demomomo.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Component
public class CreateSignature {
        String rawData;

        String secretKey;

        // Method to compute HMAC-SHA256 signature
        public String computeHmacSha256(String rawData, String secretKey) throws Exception {
                Mac hmac = Mac.getInstance("HmacSHA256"); // Create an HMAC instance for SHA256
                SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256"); // Create a key specification
                hmac.init(keySpec); // Initialize the HMAC with the secret key
                byte[] hash = hmac.doFinal(rawData.getBytes(StandardCharsets.UTF_8)); // Compute the HMAC
                return bytesToHex(hash); // Convert the byte array to a hex string and return
        }

        // Convert byte array to hex string
        private String bytesToHex(byte[] bytes) {
                StringBuilder hexString = new StringBuilder(); // Create a StringBuilder to hold the hex string
                for (byte b : bytes) { // Iterate over each byte
                        String hex = Integer.toHexString(0xFF & b); // Convert byte to hex
                        if (hex.length() == 1) hexString.append('0'); // Pad with leading zero if necessary
                        hexString.append(hex); // Append the hex value to the string
                }
                return hexString.toString(); // Return the final hex string
        }
}
