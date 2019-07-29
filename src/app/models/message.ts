import { User } from './user';

export class Message {
    id: string;
    content: string;
    sender: User;
    sentOnUtc: Date;
}
