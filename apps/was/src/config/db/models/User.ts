import { Table, Column, Model, PrimaryKey, BelongsToMany, BeforeCreate, HasMany } from "sequelize-typescript";
import bcrypt from "bcrypt"
import Organization from "./Organization";
import UserOrg from "./UserOrg";
import Role from "./Role";
import UserRole from "./UserRole";
import ConfigFile from "./ConfigFile";

@Table({tableName: "users"})
export default class User extends Model {
    @PrimaryKey
    @Column
    id!: string;

    @Column
    name!: string;

    @Column
    password!: string;

    @Column
    isSA!: boolean;

    @HasMany(() => ConfigFile)
    modifiedFiles?: ConfigFile;

    @HasMany(() => Organization)
    ownedOrgs?: Organization[];

    @BelongsToMany(() => Organization, () => UserOrg)
    orgs?: Organization[];

    @BelongsToMany(() => Role, () => UserRole)
    roles?: Role[];    

    @BeforeCreate
    static async createHash(user: User){
        const hashPw = await bcrypt.hash(user.password, 10);
        user.password = hashPw;
    }

    async comparePassword(password: string): Promise<boolean> {
        console.log(password, this.password);
        return await bcrypt.compare(password, this.password);
    }
}