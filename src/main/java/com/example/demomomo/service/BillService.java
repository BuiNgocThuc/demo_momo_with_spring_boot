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

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class BillService {
        BillRepository billRepository;
        MomoService momoService;
        private final BillMapper billMapper;

        // create payment momo
        public MomoCreatePaymentDTO createPaymentMomo(Integer id, MomoRequestCreatePaymentDTO request) {
                Bill bill = billRepository.findById(id).orElseThrow(() -> new RuntimeException("Bill not found"));
                System.out.println(bill.toString());
                try {
                        return momoService.createPayment(bill, request);
                } catch (Exception e) {
                        throw new RuntimeException(e);
                }
        }

        // handle momo callback
        public void handleMomoCallBack(Integer id, MomoCallbackDTO callbackDto) {
                if (callbackDto.getResultCode() == 0) {
                        Bill bill = billRepository.findById(id).orElse(null);
                        if (bill != null) {
                                bill.setStatus("Paid");
                                billRepository.save(bill); // Assuming this saves the updated bill
                        }
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
