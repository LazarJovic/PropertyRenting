package propertyrenting.ad.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
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
    private Set<AdImage> adSet;

}
