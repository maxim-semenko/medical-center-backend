import {Trim} from 'class-sanitizer';
import {IsEmail, IsNumber, IsString, MinLength} from 'class-validator';

export class RegisterDto {

    @IsNumber()
    public readonly age: number;
    @IsString()
    public readonly bloodType: string;
    @IsString()
    public readonly firstname: string;
    @IsString()
    public readonly lastname: string;
    @IsString()
    public readonly passport: string;
    @Trim()
    @IsEmail()
    public readonly email: string;
    @IsString()
    @MinLength(8)
    public readonly password: string;
}

export class LoginDto {
    @Trim()
    @IsEmail()
    public readonly email: string;

    @IsString()
    public readonly password: string;
}