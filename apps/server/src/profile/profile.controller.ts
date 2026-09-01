import { Controller, Get, Req } from "@nestjs/common";
import {
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from "@nestjs/swagger";

import { Auth } from "@/auth/auth.decorator";
import type { AuthenticatedRequest } from "@/auth/types/authenticated-request.type";
import { OpenApi } from "@/common/openapi/openapi.decorator";

import { ProfileResponseDto } from "./dto/profile-response.dto";
import { ProfileService } from "./profile.service";

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
    exceptions: [ApiUnauthorizedResponse, ApiNotFoundResponse],
  })
  async getProfile(@Req() req: AuthenticatedRequest) {
    const profile = await this.profileService.getOneByUserId(req.user.sub);

    return profile;
  }
}
