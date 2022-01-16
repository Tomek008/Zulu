import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Haslo12',
    database: 'test4',
    entities: [
        __dirname + '/../**/**.entity{.ts,.js}'
],
    synchronize: true
}