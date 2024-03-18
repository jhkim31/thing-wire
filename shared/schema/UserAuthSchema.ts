import { JSONSchemaType } from "ajv";
import IUserAuth from "../interface/auth/IUserAuth";

const UserAuthSchema: JSONSchemaType<IUserAuth> = {
    $id : "UserAuth",
    type : "object",
    properties : {
        id : {
            type : "string"
        },
        pw : {
            type : "string"
        },
    },
    required: ["id", "pw"],
    additionalProperties: false
}

export default UserAuthSchema;