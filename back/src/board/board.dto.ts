import { UserDto } from "src/users/users.dto";
export class BoardDto{
    readonly name: string;
}

export class BoardRo{
    id: number;
    name: string;
    author: UserDto;
}