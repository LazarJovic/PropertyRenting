package propertyrenting.booking.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
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
    private String country;

    @Setter
    @Column
    private String city;

    @Setter
    @Column
    private String address;

    @Setter
    @Column
    private double pricePerNight;

    @Setter
    @Column
    private double securityDeposit;

    @Setter
    @Column
    private LocalDate startDate;

    @Setter
    @Column
    private LocalDate endDate;

    @Setter
    @Column
    private Long propertyId;

    @Setter
    @Column
    private Long landlordId;

    @OneToMany(mappedBy = "bookingAd", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<BookingRequest> bookingRequestSet;

}
