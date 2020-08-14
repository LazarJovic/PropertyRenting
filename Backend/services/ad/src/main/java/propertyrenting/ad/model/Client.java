package propertyrenting.ad.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "client")
@NoArgsConstructor
@Getter
public class Client {

    @Id
    private Long id;

    @Setter
    @Column
    private String firstName;

    @Setter
    @Column
    private String surname;

    @Setter
    @Column
    private String email;

    @Setter
    @Column
    private boolean isTenant;

    @OneToMany(mappedBy = "landlord", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<PropertyInfo> ownedPropertySet;

    @ManyToMany
    @JoinTable(name = "tenant_favourites", joinColumns = @JoinColumn(name = "tenant_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "ad_id", referencedColumnName = "id"))
    private Set<Ad> favouriteAdSet;

}
