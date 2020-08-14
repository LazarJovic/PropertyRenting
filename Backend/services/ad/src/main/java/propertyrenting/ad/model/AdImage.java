package propertyrenting.ad.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "ad_image")
@NoArgsConstructor
@Getter
public class AdImage {

    @Id
    @GeneratedValue
    private Long id;

    @Setter
    @Column
    private String name;

    @Setter
    @Column
    private String type;

    @Setter
    @Column
    private byte[] picByte;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ad", referencedColumnName = "id")
    private Ad ad;

}
