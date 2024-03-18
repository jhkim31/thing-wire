import { DataType, Table, Column, PrimaryKey, ForeignKey, BelongsTo, Model } from "sequelize-typescript";
import User from "./User";
import Group from "./Group";

@Table({tableName: "config_files"})
export default class ConfigFile extends Model{
    @PrimaryKey
    @Column
    id!: string;

    @Column
    name!: string;

    @Column
    comment!: string;    

    @Column({
        type: DataType.TEXT
    })
    data!: string;    


    @ForeignKey(() => Group)
    @Column
    groupId!: string;   

    @BelongsTo(() => Group)
    group?: Group;


    @ForeignKey(() => User)
    @Column
    modifierId!: string;    

    @BelongsTo(() => User)
    modifier?: User;
}

/**
 * 
 */
