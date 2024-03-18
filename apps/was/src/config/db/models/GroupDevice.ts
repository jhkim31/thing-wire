import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Device from "./Device";
import Group from "./Group";

@Table({tableName: "group_device"})
export default class GroupDevice extends Model {
    @ForeignKey(() => Group)
    @Column
    groupId!: string;

    @ForeignKey(() => Device)
    @Column
    deviceId!: string;
}