import { Test, TestingModule } from "@nestjs/testing";
import { ProfileService } from "./profile.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Profile } from "./entities/profile.entity";
import { UsersService } from "../users/users.service";

describe("ProfileService", () => {
  let service: ProfileService;

  const mockProfileRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockUsersService = {
    findOneById: jest.fn(),
    findOneByEmail: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: getRepositoryToken(Profile),
          useValue: mockProfileRepository,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
