import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseAutoId } from "../../BaseIds/BaseAutoId";
import { BackOfficeRole } from "../BackOfficeRole/BackOfficeRole.entity";

@Entity("back_office_users")
export class BackOfficeUser extends BaseAutoId {
  // @Column({ nullable: false, default: true })
  // isActive: boolean;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => BackOfficeRole, (role) => role, { nullable: true })
  @JoinColumn({ name: "role_id" })
  role_id: BackOfficeRole;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true, type: "varchar" })
  device_token: string;
  
  @ManyToOne(() => BackOfficeUser, (created_by) => created_by, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "created_by" })
  created_by: BackOfficeUser;

  @ManyToOne(() => BackOfficeUser, (updated_by) => updated_by, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "updated_by" })
  updated_by: BackOfficeUser;
}
