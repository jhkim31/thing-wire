import { JSONSchemaType } from "ajv";

const StringArraySchema: JSONSchemaType<string[]> = {
    $id : "StringArray",
    type : "array",
    items: {
        type: "string"
    }
}

export default StringArraySchema;