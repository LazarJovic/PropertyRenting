package propertyrenting.user.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class Admin extends User {

    public Admin(String firstName, String surname, String email, String phone, String password) {
        super(firstName, surname, email, phone, password);
    }

}
