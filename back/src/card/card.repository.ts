import { EntityRepository } from "typeorm";
import { Repository } from "typeorm/repository/Repository";
import { Card } from "./card.entity";

@EntityRepository(Card)
    export class CardRepository extends Repository<Card>{

    }
