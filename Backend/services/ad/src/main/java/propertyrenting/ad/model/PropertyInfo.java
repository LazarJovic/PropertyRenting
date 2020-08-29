package propertyrenting.ad.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "property_info")
@NoArgsConstructor
@Getter
public class PropertyInfo {

    @Id
    private Long id;

    @Setter
    @Column
    private String propertyType;

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
    private double size;

    @Setter
    @Column
    private boolean furnished;

    @Setter
    @Column
    private int numberOfRooms;

    @Setter
    @Column
    private double distanceFromCenter;

    @Setter
    @Column
    private boolean internetIncluded;

    @Setter
    @Column
    private boolean airConditionIncluded;

    @Setter
    @Column
    private double averageRating;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "landlord", referencedColumnName = "id")
    private Client landlord;

    @OneToMany(mappedBy = "propertyInfo", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Ad> adSet;

    public PropertyInfo(Long id, String propertyType, String country, String city, String address, double size,
                        boolean furnished, int numberOfRooms, double distanceFromCenter, boolean internetIncluded,
                        boolean airConditionIncluded) {
        this.id = id;
        this.propertyType = propertyType;
        this.country = country;
        this.city = city;
        this.address = address;
        this.size = size;
        this.furnished = furnished;
        this.numberOfRooms = numberOfRooms;
        this.distanceFromCenter = distanceFromCenter;
        this.internetIncluded = internetIncluded;
        this.airConditionIncluded = airConditionIncluded;
    }
}
