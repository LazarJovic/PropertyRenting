package propertyrenting.ad.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import propertyrenting.ad.enumeration.GuestPreference;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ad")
@NoArgsConstructor
@Getter
public class Ad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column
    private double pricePerNight;

    @Setter
    @Column
    private double securityDeposit;

    @Setter
    @Column
    private LocalDateTime postingDate;

    @Setter
    @Column
    private boolean durationLimited;

    @Setter
    @Column
    private LocalDateTime startDate;

    @Setter
    @Column
    private LocalDateTime endDate;

    @Setter
    @Column(name = "guest_preference")
    @Enumerated(EnumType.STRING)
    private GuestPreference guestPreference;

    @Setter
    @Column
    private String additionalInfo;

    @Setter
    @Column
    private boolean deleted;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_info", referencedColumnName = "id")
    private PropertyInfo propertyInfo;

    @ManyToMany(mappedBy = "favouriteAdSet")
    private Set<Client> tenantSet;

    @OneToMany(mappedBy = "ad", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<AdImage> adImageSet;

    public Ad(double pricePerNight, double securityDeposit, LocalDateTime postingDate, boolean durationLimited,
              LocalDateTime startDate, LocalDateTime endDate, String additionalInfo) {
        this.pricePerNight = pricePerNight;
        this.securityDeposit = securityDeposit;
        this.postingDate = postingDate;
        this.durationLimited = durationLimited;
        this.startDate = startDate;
        this.endDate = endDate;
        this.additionalInfo = additionalInfo;
        this.tenantSet = new HashSet<>();
        this.adImageSet = new HashSet<>();
    }
}
