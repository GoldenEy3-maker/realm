import { ProfileResponseDto } from "./dto/profile-response.dto";
import { Profile } from "./entities/profile.entity";

export class ProfileMapper {
  static toDto(profile: Profile): ProfileResponseDto {
    return {
      id: profile.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      avatarUrl: profile.avatarUrl,
      bio: profile.bio,
      birthDate: profile.birthDate,
    };
  }
}
