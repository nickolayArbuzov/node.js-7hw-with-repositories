import { IsString, Length, IsUUID } from "class-validator";

export class CreateCommentDto {
    @IsString()
    @Length(20, 300)
    readonly content: string;

    /*@IsUUID()
    readonly userId: string;

    @IsString()
    readonly userLogin: string;*/
}