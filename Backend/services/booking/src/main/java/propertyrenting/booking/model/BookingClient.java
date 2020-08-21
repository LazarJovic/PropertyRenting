package propertyrenting.booking.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "booking_client")
@NoArgsConstructor
@Getter
public class BookingClient {

    @Id
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

    @OneToMany(mappedBy = "bookingClient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<BookingRequest> bookingRequestSet;

    public BookingClient(Long id, String firstName, String surname, String email) {
        this.id = id;
        this.firstName = firstName;
        this.surname = surname;
        this.email = email;
        this.bookingRequestSet = new HashSet<>();
    }
}
