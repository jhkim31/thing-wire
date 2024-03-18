import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Device from "./Device";
import Organization from "./Organization";

@Table({tableName: "org_device"})
export default class OrgDevice extends Model {    
    @ForeignKey(() => Device)
    @Column
    deviceId!: string;

    @ForeignKey(() => Organization)
    @Column
    orgId!: string;
}