package propertyrenting.property.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "property_type")
@NoArgsConstructor
@Getter
public class PropertyType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column
    private String name;

    @Setter
    @Column
    private String description;

    @Setter
    @OneToMany(mappedBy = "propertyType", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Property> propertySet;

    public PropertyType(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
