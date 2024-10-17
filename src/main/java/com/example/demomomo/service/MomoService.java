package com.example.demomomo.service;

import com.example.demomomo.configuration.MomoSettings;
import com.example.demomomo.dto.MomoCreatePaymentDTO;
import com.example.demomomo.dto.MomoRequestCreatePaymentDTO;
import com.example.demomomo.entity.Bill;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class MomoService {
        MomoSettings momoSettings;
        RestTemplate restTemplate;
        ObjectMapper objectMapper;

        public MomoCreatePaymentDTO createPayment(Bill bill, MomoRequestCreatePaymentDTO request) throws Exception {
                System.out.println("Creating Momo payment...");

                String billInfo = "Payment for the bill " + bill.getMonthly();
                String requestId = UUID.randomUUID().toString();
                String orderId = System.currentTimeMillis() + "_" + bill.getId();
                String notifyUrl = momoSettings.getNotifyUrl().replace("{{id}}", String.valueOf(bill.getId()));

                // Create extraData
                String extraData = Base64.getEncoder().encodeToString(objectMapper.writeValueAsBytes(new ExtraData(bill.getId())));

                // Build rawData
                String rawData = String.format("accessKey=%s&amount=%d&extraData=%s&ipnUrl=%s&orderId=%s&orderInfo=%s" +
                                        "&partnerCode=%s&redirectUrl=%s&requestId=%s&requestType=%s",
                                momoSettings.getAccessKey(),
                                bill.getTotalPrice(),
                                extraData,
                                notifyUrl,
                                orderId,
                                billInfo,
                                momoSettings.getPartnerCode(),
                                momoSettings.getReturnUrl(),
                                requestId,
                                request.getRequestType());

                // Create signature
                String signature = computeHmacSha256(rawData, momoSettings.getSecretKey());

                // Build request data
                PaymentRequestData requestData = new PaymentRequestData(
                                momoSettings.getPartnerCode(),
                                requestId,
                                (long) bill.getTotalPrice(),
                                orderId,
                                billInfo,
                                momoSettings.getReturnUrl(),
                                notifyUrl,
                                "vi",
                                15,
                                extraData,
                                request.getRequestType(),
                                signature,
                                true
                );

                // Prepare HTTP request
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);
                HttpEntity<PaymentRequestData> httpEntity = new HttpEntity<>(requestData, headers);

                try {
                        ResponseEntity<MomoCreatePaymentDTO> response = restTemplate.exchange(
                                        momoSettings.getMomoApiUrl(),
                                        HttpMethod.POST,
                                        httpEntity,
                                        MomoCreatePaymentDTO.class
                        );

                        if (response.getStatusCode().is2xxSuccessful()) {
                                return response.getBody();
                        } else {
                                System.out.println("Error: " + response.getStatusCode());
                                throw new Exception("Failed to create Momo payment: " + response.getStatusCode());
                        }
                } catch (Exception ex) {
                        System.out.println("Exception: " + ex.getMessage());
                        throw ex;
                }
        }

        // Method to compute HMAC-SHA256 signature
        private String computeHmacSha256(String rawData, String secretKey) throws Exception {
                Mac hmac = Mac.getInstance("HmacSHA256");
                SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
                hmac.init(keySpec);
                byte[] hash = hmac.doFinal(rawData.getBytes(StandardCharsets.UTF_8));
                return bytesToHex(hash);
        }

        // Convert byte array to hex string
        private String bytesToHex(byte[] bytes) {
                StringBuilder hexString = new StringBuilder();
                for (byte b : bytes) {
                        String hex = Integer.toHexString(0xFF & b);
                        if (hex.length() == 1) hexString.append('0');
                        hexString.append(hex);
                }
                return hexString.toString();
        }

        // Inner class for extraData
        public static class ExtraData {
                private final long bill_id;

                public ExtraData(long bill_id) {
                        this.bill_id = bill_id;
                }

                // Getter for bill_id
                public long getBill_id() {
                        return bill_id;
                }
        }

        // Inner class for payment request data
        public static class PaymentRequestData {
                private String partnerCode;
                private String requestId;
                private long amount;
                private String orderId;
                private String orderInfo;
                private String redirectUrl;
                private String ipnUrl;
                private String lang;
                private int orderExpireTime;
                private String extraData;
                private String requestType;
                private String signature;
                private boolean autoCapture;

                public PaymentRequestData(String partnerCode, String requestId, long amount, String orderId,
                                                String orderInfo, String redirectUrl, String ipnUrl, String lang,
                                                int orderExpireTime, String extraData, String requestType,
                                                String signature, boolean autoCapture) {
                        this.partnerCode = partnerCode;
                        this.requestId = requestId;
                        this.amount = amount;
                        this.orderId = orderId;
                        this.orderInfo = orderInfo;
                        this.redirectUrl = redirectUrl;
                        this.ipnUrl = ipnUrl;
                        this.lang = lang;
                        this.orderExpireTime = orderExpireTime;
                        this.extraData = extraData;
                        this.requestType = requestType;
                        this.signature = signature;
                        this.autoCapture = autoCapture;
                }
        }
}
