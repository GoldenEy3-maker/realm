import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ValueOf } from "@repo/types/value-of";
import { Profile } from "../../profile/entities/profile.entity";

export const UserStatus = {
  ONLINE: "online",
  OFFLINE: "offline",
  INACTIVE: "inactive",
} as const;

export type UserStatus = ValueOf<typeof UserStatus>;

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 256, unique: true })
  email: string;

  @Column({ type: "varchar", length: 50, unique: true })
  username: string;

  @Column({ type: "enum", enum: Object.values(UserStatus), default: UserStatus.OFFLINE })
  status: UserStatus;

  @Column({ name: "is_archived", type: "boolean", default: false })
  isArchived: boolean;

  @Column({ name: "token_version", type: "integer", default: 0 })
  tokenVersion: number;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
