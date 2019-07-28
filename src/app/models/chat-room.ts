import { User } from './user';

export class ChatRoom {
    id: string;
    name: string;
    createdOnUtc: Date;
    owner: User;
}
