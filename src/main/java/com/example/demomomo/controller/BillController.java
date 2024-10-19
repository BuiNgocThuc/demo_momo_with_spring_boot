package com.example.demomomo.controller;

import com.example.demomomo.dto.MomoCallbackDTO;
import com.example.demomomo.dto.MomoCreatePaymentDTO;
import com.example.demomomo.dto.MomoRequestCreatePaymentDTO;
import com.example.demomomo.dto.bill.BillCreationRequest;
import com.example.demomomo.dto.bill.BillPatchRequest;
import com.example.demomomo.dto.bill.BillResponse;
import com.example.demomomo.dto.bill.BillUpdateRequest;
import com.example.demomomo.service.BillService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bills")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BillController {
        BillService billService;

        // get all
        @GetMapping
        public List<BillResponse> getAllBills() {
                return billService.getAllBills();
        }

        // get by id
        @GetMapping("/{id}")
        public BillResponse getBillById(@PathVariable Integer id) {
                return billService.getBillById(id);
        }

        // create
        @PostMapping
        BillResponse createBill(@RequestBody BillCreationRequest request) {
                return billService.createBill(request);
        }

        // update
        @PutMapping("/{id}")
        BillResponse updateBill(@PathVariable Integer id, @RequestBody BillUpdateRequest request) {
                return billService.updateBill(id, request);
        }

        // patch
        @PatchMapping("/{id}")
        BillResponse patchBill(@PathVariable Integer id, @RequestBody BillPatchRequest request) {
                return billService.patchBill(id, request);
        }

        @PostMapping("/{id}/payment/momo")
        public ResponseEntity<MomoCreatePaymentDTO> createPaymentMomo(@PathVariable Integer id, @RequestBody MomoRequestCreatePaymentDTO request) {
                MomoCreatePaymentDTO payment = billService.createPaymentMomo(id, request);
                return ResponseEntity.ok(payment); // Returns a 200 OK response with the payment details.
        }
        @PostMapping("/{id}/momo-callback")
        public ResponseEntity<Void> handleMomoCallBack(@PathVariable Integer id, @RequestBody MomoCallbackDTO callbackDto) {
                billService.handleMomoCallBack(id, callbackDto);
                return ResponseEntity.noContent().build();
        }
}
