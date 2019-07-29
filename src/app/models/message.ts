import { User } from './user';

export class Message {
    id: string;
    content: string;
    chatRoomId: string;
    sender: User;
    sentOnUtc: Date;
}
