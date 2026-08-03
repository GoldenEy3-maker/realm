import { ApiProperty } from "@nestjs/swagger";

export class ProfileResponseDto {
  @ApiProperty({ type: "number", example: 1 })
  id: number;

  @ApiProperty({ type: "string", example: "John" })
  firstName: string;

  @ApiProperty({ type: "string", example: "Doe", required: false })
  lastName: string;

  @ApiProperty({ type: "string", example: "https://example.com/avatar.jpg", required: false })
  avatarUrl: string;

  @ApiProperty({ type: "string", example: "I am a software engineer", required: false })
  bio: string;

  @ApiProperty({ type: "string", format: "date", example: "1990-01-01", required: false })
  birthDate: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    avatarUrl: string,
    bio: string,
    birthDate: string,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatarUrl = avatarUrl;
    this.bio = bio;
    this.birthDate = birthDate;
  }
}
