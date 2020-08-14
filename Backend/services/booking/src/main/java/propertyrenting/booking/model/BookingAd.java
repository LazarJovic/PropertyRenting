package propertyrenting.booking.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "booking_ad")
@NoArgsConstructor
@Getter
public class BookingAd {

    @Id
    private Long id;

    @Setter
    @Column
    private Long propertyId;

    @Setter
    @Column
    private Long landlordId;

    @OneToMany(mappedBy = "bookingAd", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<BookingRequest> bookingRequestSet;

}
