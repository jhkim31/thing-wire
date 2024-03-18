import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey } from "sequelize-typescript";
import Organization from "./Organization";

@Table({tableName: "permissions"})
export default class Permission extends Model {
    @PrimaryKey
    @Column
    id!: string;

    @Column
    action!: string;

    @ForeignKey(() => Organization)
    @Column
    orgId!: string;

    @BelongsTo(() => Organization)
    organization?: Organization;
}