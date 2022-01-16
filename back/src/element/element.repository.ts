import { EntityRepository, Repository } from "typeorm";
import { Element } from "./element.entity";

@EntityRepository(Element)
export class ElementRepository extends Repository<Element>{
    
}