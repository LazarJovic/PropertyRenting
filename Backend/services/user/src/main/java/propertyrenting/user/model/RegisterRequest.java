package propertyrenting.user.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "register_request")
@NoArgsConstructor
@Getter
public class RegisterRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column
    private String firstName;

    @Setter
    @Column
    private String surname;

    @Setter
    @Column
    private String email;

    @Setter
    @Column
    private String password;

    @Setter
    @Column
    private String phone;

    @Setter
    @Column
    private String country;

    @Setter
    @Column
    private String city;

    @Setter
    @Column
    private String address;

    @Setter
    @Column
    private String postcode;

    @Setter
    @Column
    private UUID verificationToken;

    @Setter
    @Column
    private LocalDateTime verificationTokenTime;

}
