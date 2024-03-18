import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Role from "./Role";
import User from "./User";

@Table({tableName: "user_role"})
export default class UserRole extends Model {
    @ForeignKey(() => User)
    @Column
    userId!: string;

    @ForeignKey(() => Role)
    @Column
    roleId!: string;
}