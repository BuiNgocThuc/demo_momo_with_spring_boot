package com.example.demomomo.service;

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
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class BillService {

        BillRepository billRepository;
        MomoService momoService;
        private final BillMapper billMapper;

        public MomoCreatePaymentDTO createPaymentMomo(long id, MomoRequestCreatePaymentDTO request) {
                Bill bill = billRepository.findById(id).orElseThrow(() -> new RuntimeException("Bill not found"));
                try {
                        return momoService.createPayment(bill, request);
                } catch (Exception e) {
                        throw new RuntimeException(e);
                }
        }

        public void handleMomoCallBack(long id, MomoCallbackDTO callbackDto) {
                if (callbackDto.getResultCode() == 0) {
                        Bill bill = billRepository.findById(id).orElse(null);
                        if (bill != null) {
                                bill.setStatus("Paid");
                                billRepository.save(bill); // Assuming this saves the updated bill
                        }
                }
        }

        public BillResponse createBill(BillCreationRequest request) {
                Bill bill = billMapper.creationRequestToEntity(request);

                return billMapper.entityToResponse(billRepository.save(bill));
        }

        public BillResponse updateBill(Long id, BillUpdateRequest request) {
                Bill bill = billRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Bill Not Found"));

                billMapper.updateRequestToEntity(bill, request);
                return billMapper.entityToResponse(billRepository.save(bill));
        }

        public BillResponse patchBill(Long id, BillPatchRequest request) {
                Bill bill = billRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Bill Not Found"));

                billMapper.patchRequestToEntity(bill, request);
                return billMapper.entityToResponse(billRepository.save(bill));
        }
}
