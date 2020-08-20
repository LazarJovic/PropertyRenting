package propertyrenting.user.service;

import org.springframework.stereotype.Service;

@Service
public class ValidationService {

    public boolean isStringNullOrEmpty(String data) {
        return data == null || data.equals("");
    }

    public boolean checkStringLength(String data) {
        return data.length() > 50;
    }

    public boolean isNumber(String data) {
        return data.matches("^[0-9]+$");
    }

    public boolean isPasswordLengthValid(String password) {
        return !isStringNullOrEmpty(password) && password.length() > 7;
    }

    public boolean isEmailValid(String email) {
        String emailFormatErr = "Email is in the incorrect format.";
        if (email == null || email.isEmpty()) {
            return false;
        }
        if (!email.contains("@")) {
            return false;
        } else {
            String[] parts = email.split("@");
            if (parts.length == 0 || parts[0].isEmpty() || parts.length != 2) {
                return false;
            }
            if (!parts[1].contains(".")) {
                return false;
            } else {
                String before = parts[1].substring(0, parts[1].lastIndexOf("."));
                String after = parts[1].substring(parts[1].lastIndexOf(".") + 1);
                if (before.isEmpty() || after.isEmpty()) {
                    return false;
                }
            }
        }
        return true;
    }

}
