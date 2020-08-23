package propertyrenting.ad.service;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

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

    public boolean checkDateFormat(String data) {
        try {
            LocalDate.parse(data);
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }

}
