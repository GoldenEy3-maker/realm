import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { ProfileResponseDto } from "./dto/profile-response.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile } from "./entities/profile.entity";
import { Repository } from "typeorm";
import { ProfileMapper } from "./profile.mapper";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { I18nService } from "nestjs-i18n";

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

    return profile ? ProfileMapper.toDto(profile) : null;
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
