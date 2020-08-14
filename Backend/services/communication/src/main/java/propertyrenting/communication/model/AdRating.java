package propertyrenting.communication.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "ad_rating")
@NoArgsConstructor
@Getter
public class AdRating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column
    private int rating;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "booking", referencedColumnName = "id")
    private Booking booking;

}
