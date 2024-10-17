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

@RestController
@RequestMapping("/bills")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BillController {
        BillService billService;

        // create
        @PostMapping
        BillResponse createBill(@RequestBody BillCreationRequest request) {
                return billService.createBill(request);
        }

        // update
        @PutMapping("/{id}")
        BillResponse updateBill(@PathVariable Long id, @RequestBody BillUpdateRequest request) {
                return billService.updateBill(id, request);
        }

        // patch
        @PatchMapping("/{id}")
        BillResponse patchBill(@PathVariable Long id, @RequestBody BillPatchRequest request) {
                return billService.patchBill(id, request);
        }

        @PostMapping("/{id}/payment/momo")
        public ResponseEntity<MomoCreatePaymentDTO> createPaymentMomo(@PathVariable long id, @RequestBody MomoRequestCreatePaymentDTO request) {
                MomoCreatePaymentDTO payment = billService.createPaymentMomo(id, request);
                return ResponseEntity.ok(payment);
        }

        @PostMapping("/{id}/momo-callback")
        public ResponseEntity<Void> handleMomoCallBack(@PathVariable long id, @RequestBody MomoCallbackDTO callbackDto) {
                billService.handleMomoCallBack(id, callbackDto);
                return ResponseEntity.noContent().build();
        }
}
