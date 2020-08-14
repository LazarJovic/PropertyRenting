package propertyrenting.property.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "property")
@NoArgsConstructor
@Getter
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    private double size;

    @Setter
    @Column
    private boolean furnished;

    @Setter
    @Column
    private int numberOfRooms;

    @Setter
    @Column
    private int numberOfPersons;

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
    @Column
    private boolean deleted;

    @Setter
    @OneToMany(mappedBy = "property", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<PropertyImage> propertyImagesSet;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_type", referencedColumnName = "id")
    private PropertyType propertyType;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "landlord", referencedColumnName = "id")
    private Landlord landlord;

    public Property(String country, String city, String address, double size, boolean furnished, int numberOfRooms,
                    int numberOfPersons, double distanceFromCenter, boolean internetIncluded,
                    boolean airConditionIncluded, double averageRating, boolean deleted) {
        this.country = country;
        this.city = city;
        this.address = address;
        this.size = size;
        this.furnished = furnished;
        this.numberOfRooms = numberOfRooms;
        this.numberOfPersons = numberOfPersons;
        this.distanceFromCenter = distanceFromCenter;
        this.internetIncluded = internetIncluded;
        this.airConditionIncluded = airConditionIncluded;
        this.averageRating = averageRating;
        this.deleted = deleted;
    }
}
