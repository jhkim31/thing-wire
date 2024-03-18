import { JSONSchemaType } from "ajv";
import IUser from "../interface/user/IUser";

/**
 * UserSchema
 * * id : User
 */
const UserSchema: JSONSchemaType<IUser> = {
    $id : "User",
    type : "object",
    properties : {
        id : {
            type : "string"
        },
        name : {
            type : "string"
        },
        isSA: {
            type: "boolean",
            nullable: true
        }
    },
    required: ["id", "name"],
    additionalProperties: true
}

export default UserSchema;