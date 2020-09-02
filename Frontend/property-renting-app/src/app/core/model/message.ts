import { send } from 'process';

export class Message {

    public id: number;
    public senderName: string;
    public senderSurname: string;
    public senderEmail: string;
    public content: string;
    public timestamp: string;
    public sender: boolean;
    public bookingId: number;

    constructor(id: number, senderName: string, senderSurname: string, senderEmail: string, content: string,
                timestamp: string, sender: boolean, bookingId: number) {
            this.id = id;
            this.senderName = senderName;
            this.senderSurname = senderSurname;
            this.senderEmail = senderEmail;
            this.content = content;
            this.timestamp = timestamp;
            this.sender = sender;
            this.bookingId = bookingId;
        }

}
