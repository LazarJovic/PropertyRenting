package propertyrenting.property.service;

import org.springframework.stereotype.Service;

@Service
public class ValidationService {

    public boolean isStringNullOrEmpty(String data) {
        return data == null || data.equals("");
    }

   public boolean checkStringLength(String data) {
        return data.length() > 50;
   }

   public boolean checkIfDoubleExistsAndIsNotNegative(Double data) {
       return data == null || data <= 0;
   }

   public boolean checkIfIntExistsAndIsNotNegative(Integer data) {
        return data == null || data <= 0;
   }

}
