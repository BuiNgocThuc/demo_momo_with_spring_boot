package com.example.demomomo.mapper;

import com.example.demomomo.dto.bill.BillCreationRequest;
import com.example.demomomo.dto.bill.BillPatchRequest;
import com.example.demomomo.dto.bill.BillResponse;
import com.example.demomomo.dto.bill.BillUpdateRequest;
import com.example.demomomo.entity.Bill;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BillMapper {
        // mapping creation request to entity
        Bill creationRequestToEntity(BillCreationRequest request);

        // mapping update request to entity
        void updateRequestToEntity(@MappingTarget Bill bill, BillUpdateRequest request);

        // mapping patch request to entity
        @BeanMapping(nullValuePropertyMappingStrategy = org.mapstruct.NullValuePropertyMappingStrategy.IGNORE)
        void patchRequestToEntity(@MappingTarget Bill bill, BillPatchRequest request);

        // mapping entity to response
        BillResponse entityToResponse(Bill bill);

}
