import { List } from "src/list/list.entity";
import { UserDto } from "src/auth/user.dto";
export class BoardDto{
    readonly name: string;
}

export class BoardRo{
    id: number;
    name: string;
    author: UserDto;
    list: List
}