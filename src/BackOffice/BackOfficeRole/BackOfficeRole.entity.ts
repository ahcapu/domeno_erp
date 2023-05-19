import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseAutoId } from "../../BaseIds/BaseAutoId";
import { BackOfficeUser } from "../BackOfficeUser/BackOfficeUser.entity";

@Entity("back_office_role")
export class BackOfficeRole extends BaseAutoId {
  @Column({ nullable: false, unique: true })
  role: string;

  @ManyToOne(() => BackOfficeUser, (created_by) => created_by, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'create_by' })
  create_by: BackOfficeUser;

  @ManyToOne(() => BackOfficeUser, (created_by) => created_by, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by: BackOfficeUser;
}
