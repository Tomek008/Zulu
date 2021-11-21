import { Board } from "src/board/board.entity";
export class UserDto{
    id: number;
    login: string;
    password: string;
    boards?: Board[]
}