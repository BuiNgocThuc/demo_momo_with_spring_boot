package com.example.demomomo.service;

import com.example.demomomo.configuration.MomoSettings;
import com.example.demomomo.dto.ExtraData;
import com.example.demomomo.dto.MomoCallbackDTO;
import com.example.demomomo.dto.MomoCreatePaymentDTO;
import com.example.demomomo.dto.MomoRequestCreatePaymentDTO;
import com.example.demomomo.dto.bill.BillCreationRequest;
import com.example.demomomo.dto.bill.BillPatchRequest;
import com.example.demomomo.dto.bill.BillResponse;
import com.example.demomomo.dto.bill.BillUpdateRequest;
import com.example.demomomo.entity.Bill;
import com.example.demomomo.mapper.BillMapper;
import com.example.demomomo.repository.BillRepository;
import com.example.demomomo.utils.CreateSignature;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class BillService {
        BillRepository billRepository;
        MomoService momoService;
        BillMapper billMapper;
        MomoSettings momoSettings;
        CreateSignature createSignature;
        ObjectMapper objectMapper;

        // create payment momo
        public MomoCreatePaymentDTO createPaymentMomo(Integer id, MomoRequestCreatePaymentDTO request) {
                Bill bill = billRepository.findById(id).orElseThrow(() -> new RuntimeException("Bill not found"));
                try {
                        return momoService.createPayment(bill, request);
                } catch (Exception e) {
                        throw new RuntimeException(e);
                }
        }

        // handle momo callback
        public void handleMomoCallBack(Integer id, MomoCallbackDTO callbackDto) {

                // First, generate the signature to compare
                String rawData = String.format("accessKey=%s&amount=%.0f&extraData=%s&message=%s&orderId=%s" +
                                        "&orderInfo=%s&orderType=%s&partnerCode=%s&payType=%s&requestId=%s" +
                                        "&responseTime=%d&resultCode=%d&transId=%d",
                                momoSettings.getAccessKey(),
                                callbackDto.getAmount(),
                                callbackDto.getExtraData(),
                                callbackDto.getMessage(),
                                callbackDto.getOrderId(),
                                callbackDto.getOrderInfo(),
                                callbackDto.getOrderType(),
                                callbackDto.getPartnerCode(),
                                callbackDto.getPayType(),
                                callbackDto.getRequestId(),
                                callbackDto.getResponseTime(),
                                callbackDto.getResultCode(),
                                callbackDto.getTransId());

                // Create the expected signature from the rawData
                String expectedSignature = null;
                try {
                        expectedSignature = createSignature.computeHmacSha256(rawData, momoSettings.getSecretKey());
                } catch (Exception e) {
                        throw new RuntimeException(e);
                }

                // Compare the received signature with the expected signature
                if (callbackDto.getSignature().equals(expectedSignature) && callbackDto.getResultCode() == 0) {
                        // Proceed with processing the payment
                        Bill bill = billRepository.findById(id).orElse(null);
                        if (bill != null) {
                                bill.setStatus("Paid");
                                billRepository.save(bill); // Save the updated bill
                        }
                } else {
                        // Handle signature mismatch or other issues
                        System.out.println("Signature mismatch or unsuccessful result code.");
                }
        }

        // get all bills
        public List<BillResponse> getAllBills() {
                return billRepository.findAll().stream()
                                .map(billMapper::entityToResponse).toList();
        }

        // get bill by id
        public BillResponse getBillById(Integer id) {
                return billRepository.findById(id)
                                .map(billMapper::entityToResponse)
                                .orElseThrow(() -> new RuntimeException("Bill Not Found"));
        }

        public BillResponse createBill(BillCreationRequest request) {
                Bill bill = billMapper.creationRequestToEntity(request);

                return billMapper.entityToResponse(billRepository.save(bill));
        }

        public BillResponse updateBill(Integer id, BillUpdateRequest request) {
                Bill bill = billRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Bill Not Found"));

                billMapper.updateRequestToEntity(bill, request);
                return billMapper.entityToResponse(billRepository.save(bill));
        }

        public BillResponse patchBill(Integer id, BillPatchRequest request) {
                Bill bill = billRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Bill Not Found"));

                billMapper.patchRequestToEntity(bill, request);
                return billMapper.entityToResponse(billRepository.save(bill));
        }
}
