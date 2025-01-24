import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserProfileDto {
  @IsString()
  @MinLength(6)
  description: string;

  @IsString()
  @MinLength(6)
  subject: string;

  @IsString()
  @MinLength(6)
  basePrice: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
