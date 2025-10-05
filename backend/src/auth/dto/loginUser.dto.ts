import { IsString,IsNumber,IsNotEmpty } from "class-validator";


export class loginDto{

    @IsString()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    password:String
}