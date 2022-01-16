import { EntityRepository, Repository } from "typeorm";
import { TaskList } from "./tasklist.entity";

@EntityRepository(TaskList)
export class TaskListRepository extends Repository<TaskList>{
    
}