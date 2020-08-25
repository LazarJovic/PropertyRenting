export class Client {

    public id: number;
    public firstName: string;
    public surname: string;
    public email: string;
    public phone: string;
    public accountBlocked: boolean;
    public role: string;

    constructor(id: number, firstName: string, surname: string, email: string, phone: string, accountBlocked: boolean, role: string) {
        this.id = id;
        this.firstName = firstName;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.accountBlocked = accountBlocked;
        this.role = role;
    }

}