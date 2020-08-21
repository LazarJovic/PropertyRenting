package propertyrenting.user.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@NoArgsConstructor
@Getter
@Setter
@Entity
@DiscriminatorValue("TENANT")
public class Tenant extends Client {

    public Tenant(String firstName, String surname, String email, String phone, String password,
                    String country, String city, String address, String postcode) {
        super(firstName, surname, email, phone, password, country, city, address, postcode);
    }

}
