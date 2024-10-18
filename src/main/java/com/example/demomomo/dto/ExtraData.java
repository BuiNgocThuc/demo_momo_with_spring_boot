package com.example.demomomo.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ExtraData {
        Integer billId ;

        public ExtraData(Integer billId) {
                this.billId = billId;
        }
}
