package propertyrenting.property.service;

import org.springframework.stereotype.Service;

@Service
public class ValidationService {

    public boolean isStringNullOrEmpty(String data) {
        if(data == null || data.equals("")) {
            return true;
        }

        return false;
    }

}
