import { User } from "../../users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "profiles" })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.profile, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "last_name", type: "varchar", length: 256, nullable: true })
  lastName: string;

  @Column({ name: "first_name", type: "varchar", length: 256 })
  firstName: string;

  @Column({ name: "avatar_url", type: "varchar", length: 256, nullable: true })
  avatarUrl: string;

  @Column({ name: "bio", type: "text", nullable: true })
  bio: string;

  @Column({ name: "birth_date", type: "date", nullable: true })
  birthDate: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
