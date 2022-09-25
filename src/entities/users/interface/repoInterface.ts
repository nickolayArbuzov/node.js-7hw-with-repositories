import { CreateUserDto } from "../dto/create-user.dto"
import { QueryUserDto } from "../../../helpers/commonDTO/query.dto"

export interface IUserRepositoryInterface {
    findAllt(): any
    findAll(query: QueryUserDto): any
    findOneForCustomDecoratorByLogin(login: string): any
    findOneForCustomDecoratorByEmail(email: string): any
    findOneForCustomDecoratorByCode(code: string): any
    findOneForCustomDecoratorCheckMail(email: string): any
    createUser(dto: CreateUserDto): any
    deleteUser(id: string): any
}