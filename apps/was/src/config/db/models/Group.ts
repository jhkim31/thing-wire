import { Table, Column, PrimaryKey, ForeignKey, BelongsTo, BelongsToMany, Model, HasOne } from "sequelize-typescript";
import Organization from "./Organization";
import Device from "./Device";
import GroupDevice from "./GroupDevice";
import ConfigFile from "./ConfigFile";

@Table({tableName: "groups"})
export default class Group extends Model{
    @PrimaryKey
    @Column
    id!: string;

    @Column
    name!: string;

    @Column
    isConfigGroup!: boolean;

    @HasOne(() => ConfigFile)
    configFile?: ConfigFile;

    @ForeignKey(() => Organization)
    @Column
    orgId!: string;
    
    @BelongsTo(() => Organization)
    org?: Organization;

    @BelongsToMany(() => Device, () => GroupDevice)
    devices?: Device[];
}