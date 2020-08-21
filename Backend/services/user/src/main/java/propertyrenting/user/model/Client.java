package propertyrenting.user.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Client extends User {

    @Column
    private String country;

    @Column
    private String city;

    @Column
    private String address;

    @Column
    private String postcode;

    @Column
    private boolean accountBlocked;

    public Client(String firstName, String surname, String email, String phone, String password,
                  String country, String city, String address, String postcode) {
        super(firstName, surname, email, phone, password);
        this.country = country;
        this.city = city;
        this.address = address;
        this.postcode = postcode;
        this.accountBlocked = false;
    }

}
