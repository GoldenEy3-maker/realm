import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nService } from "nestjs-i18n";
import { Repository } from "typeorm";

import { UsersService } from "@/users/users.service";

import { CreateProfileDto } from "./dto/create-profile.dto";
import { ProfileResponseDto } from "./dto/profile-response.dto";
import { Profile } from "./entities/profile.entity";

@Injectable()
export class ProfileService {
  constructor(
    private readonly i18n: I18nService,
    private readonly usersService: UsersService,
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
  ) {}

  async getOneByUserId(userId: number): Promise<ProfileResponseDto | null> {
    const user = await this.usersService.findOneById(userId);

    if (!user) {
      throw new NotFoundException(this.i18n.t("common.userNotFound"));
    }

    const profile = await this.profileRepository.findOne({ where: { user: { id: user.id } } });

    return profile?.toDto() ?? null;
  }

  async create(userId: number, createProfileDto: CreateProfileDto): Promise<Profile> {
    const user = await this.usersService.findOneById(userId);

    if (!user) {
      throw new NotFoundException(this.i18n.t("common.userNotFound"));
    }

    const profile = await this.profileRepository.save({
      user,
      ...createProfileDto,
    });

    return profile;
  }
}
