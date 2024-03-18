import { BelongsTo, BelongsToMany, Column, ForeignKey, HasOne, Model, PrimaryKey, Table } from 'sequelize-typescript';

import Group from './Group';
import GroupDevice from './GroupDevice';
import Organization from './Organization';
import OrgDevice from './OrgDevice';
import ConfigFile from './ConfigFile';

/**
 * * id : 장치의 id
 * * name : 장치의 이름
 * * type : 장치의 타입
 *      * 1 : 환경센서
 *      * 2 : 
 * * comment : 장치 주석 (ThingWire에서 수정)
 */
@Table({tableName: "devices"})
export default class Device extends Model {
    @PrimaryKey
    @Column
    id!: string;

    @Column
    name!: string;

    @Column
    type!: number;

    @Column
    comment!: string;

    @ForeignKey(() => ConfigFile)
    @Column
    configFileId!: string;          

    @BelongsTo(() => ConfigFile)
    configFile?: ConfigFile;

    @BelongsToMany(() => Group, () => GroupDevice)
    groups?: Group[];

    @BelongsToMany(() => Organization, () => OrgDevice)
    organizations?: Organization[];
}
