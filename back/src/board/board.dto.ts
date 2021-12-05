import { UserDto } from "src/auth/user.dto";
import { List } from "src/list/list.entity";

export class BoardDto{
    readonly name: string;
}

export class BoardRo{
    id: number;
    name: string;
    author: UserDto;
    list: List
}