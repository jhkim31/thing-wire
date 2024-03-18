import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Organization from "./Organization";
import User from "./User"

@Table({tableName: "user_org"})
export default class UserOrg extends Model {
    @ForeignKey(() => User)
    @Column
    userId!: string;

    @ForeignKey(() => Organization)
    @Column
    orgId!: string;
}