package propertyrenting.property.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "landlord")
@NoArgsConstructor
@Getter
@Setter
public class Landlord {

    @Id
    private Long id;

    @Column
    private String firstName;

    @Column
    private String surname;

    @Column
    private String email;

    @OneToMany(mappedBy = "landlord", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Property> propertySet;

    public Landlord(Long id, String firstName, String surname, String email) {
        this.id = id;
        this.firstName = firstName;
        this.surname = surname;
        this.email = email;
    }

}
