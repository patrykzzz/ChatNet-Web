import { User } from './user';
import { Message } from './message';

export class ChatRoom {
    id: string;
    name: string;
    createdOnUtc: Date;
    owner: User;
    messages: Message[];
}
