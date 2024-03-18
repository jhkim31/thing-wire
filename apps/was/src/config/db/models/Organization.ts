import { Table, Column, Model, HasMany, PrimaryKey, BelongsToMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./User";
import Permission from "./Permission";
import Group from "./Group";
import Role from "./Role";
import UserOrg from "./UserOrg";
import Device from "./Device";
import OrgDevice from "./OrgDevice";

@Table({tableName: "organizations"})
export default class Organization extends Model {    
    @PrimaryKey
    @Column
    id!: string;

    @Column
    name!: string;

    @ForeignKey(() => User)
    @Column
    ownerId!: string;

    @BelongsTo(() => User)
    owner?: User;

    @HasMany(() => Permission)
    permissions?: Permission[];
    
    @HasMany(() => Group, {onDelete: "CASCADE", hooks: true})    
    groups?: Group[];

    @HasMany(() => Role)
    roles?: Role[];

    @BelongsToMany(() => User, () => UserOrg)
    users?: User[];
    
    @BelongsToMany(() => Device, () => OrgDevice)
    devices?: Device[];
}