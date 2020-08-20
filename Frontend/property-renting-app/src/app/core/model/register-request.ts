export class RegisterRequest {

    public id: number;
    public firstName: string;
    public surname: string;
    public email: string;
    public phone: string;
    public country: string;
    public city: string;
    public address: string;
    public postcode: string;
    public password: string;
    public confirmPassword: string;
    public landlord: boolean;

    constructor(id: number, firstName: string, surname: string, email: string, phone: string, country: string, city: string,
                address: string, postcode: string, password: string, confirmPassword: string, landlord: boolean) {
            this.id = id;
            this.firstName = firstName;
            this.surname = surname;
            this.email = email;
            this.phone = phone;
            this.country = country;
            this.city = city;
            this.address = address;
            this.postcode = postcode;
            this.password = password;
            this.confirmPassword = confirmPassword;
            this.landlord = landlord;
        }
}
