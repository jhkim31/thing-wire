import { Table, Column, Model, PrimaryKey, BelongsToMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import Organization from "./Organization";
import User from "./User";
import UserRole from "./UserRole";
import Permission from "./Permission";
import PermissionRole from "./PermissionRole";

@Table({tableName: "roles"})
export default class Role extends Model {
    @PrimaryKey
    @Column
    id!: string;

    @Column
    name!: string;

    @ForeignKey(() => Organization)
    @Column
    orgId!: string;

    @BelongsTo(() => Organization)
    organization?: Organization;

    @BelongsToMany(() => User, () => UserRole)
    users?: User[];

    @BelongsToMany(() => Permission, () => PermissionRole)
    permissions?: Permission[];
}