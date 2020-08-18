package propertyrenting.property.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "property_image")
@NoArgsConstructor
@Getter
public class PropertyImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @Setter
    private String name;

    @Column
    @Setter
    private String type;

    @Column(length = 3000)
    @Setter
    private byte[] picByte;

    @Setter
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "property", referencedColumnName = "id")
    private Property property;

    public PropertyImage(String name, String type, byte[] picByte) {
        this.name = name;
        this.type = type;
        this.picByte = picByte;
    }

}
