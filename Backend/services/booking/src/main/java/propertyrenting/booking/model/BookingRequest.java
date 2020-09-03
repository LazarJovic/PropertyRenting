package propertyrenting.booking.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import propertyrenting.booking.enumeration.BookingRequestStatus;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "booking_request")
@NoArgsConstructor
@Getter
public class BookingRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column(name = "booking_request_status")
    private BookingRequestStatus bookingRequestStatus;

    @Setter
    @Column
    private LocalDate bookingStart;

    @Setter
    @Column
    private LocalDate bookingEnd;

    @Setter
    @Column
    private LocalDateTime acceptanceTime;

    @Setter
    @Column
    private LocalDateTime pendingTime;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_client", referencedColumnName = "id")
    private BookingClient bookingClient;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_ad", referencedColumnName = "id")
    private BookingAd bookingAd;

    public BookingRequest(LocalDate bookingStart, LocalDate bookingEnd) {
        this.bookingStart = bookingStart;
        this.bookingEnd = bookingEnd;
    }
}
