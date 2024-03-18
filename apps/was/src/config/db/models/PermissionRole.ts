import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Permission from "./Permission";
import Role from "./Role";

@Table({tableName: "permission_role"})
export default class PermissionRole extends Model {
    @ForeignKey(() => Permission)
    @Column
    permissionId!: string;

    @ForeignKey(() => Role)
    @Column
    roleId!: string;
}