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

    public BookingAd(Long id, String country, String city, String address, double pricePerNight,
                     double securityDeposit, LocalDate startDate, LocalDate endDate, Long propertyId, Long landlordId) {
        this.id = id;
        this.country = country;
        this.city = city;
        this.address = address;
        this.pricePerNight = pricePerNight;
        this.securityDeposit = securityDeposit;
        this.startDate = startDate;
        this.endDate = endDate;
        this.propertyId = propertyId;
        this.landlordId = landlordId;
    }
}
