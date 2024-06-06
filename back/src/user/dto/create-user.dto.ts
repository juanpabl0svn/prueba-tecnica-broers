import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, MinLength } from "class-validator";


export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'Full name is required' })
    fullName: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string;

    @ApiProperty()
    @IsBoolean({ message: 'Active must be a boolean' })
    active: boolean

}
