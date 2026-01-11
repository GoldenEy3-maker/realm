import { Controller, Get, Req } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import type { AuthenticatedRequest } from "../auth/types/authenticated-request.type";
import {
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from "@nestjs/swagger";
import { ProfileResponseDto } from "./dto/profile-response.dto";
import { Auth } from "../auth/auth.decorator";
import { OpenApi } from "../openapi/openapi.decorator";

@Controller({ path: "profile", version: "1" })
@ApiExtraModels(ProfileResponseDto)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @Auth()
  @OpenApi({
    summary: "Get current user profile",
    success: {
      data: { $ref: getSchemaPath(ProfileResponseDto) },
      message: "Profile fetched successfully",
    },
    exeptions: [ApiUnauthorizedResponse, ApiNotFoundResponse],
  })
  async getProfile(@Req() req: AuthenticatedRequest) {
    const profile = await this.profileService.getOneByUserId(req.user.sub);

    console.log(typeof profile?.birthDate);

    return profile;
  }
}
