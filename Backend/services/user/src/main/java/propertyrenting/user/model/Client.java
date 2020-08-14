package propertyrenting.user.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;

@NoArgsConstructor
@Getter
@Setter
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

    @Column
    private boolean commentingBlocked;

}
