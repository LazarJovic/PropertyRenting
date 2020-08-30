export class Comment {

    public id: number;
    public firstName: string;
    public surname: string;
    public email: string;
    public timestamp: string;
    public content: string;

    constructor(id: number, firstName: string, surname: string, email: string, timestamp: string, content: string) {
        this.id = id;
        this.firstName = firstName;
        this.surname = surname;
        this.email = email;
        this.timestamp = timestamp;
        this.content = content;
    }

}

