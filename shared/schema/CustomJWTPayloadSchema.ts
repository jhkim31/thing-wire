const CustomJWTPayloadSchema = {
    $id: "jwt.CustomPayload",
    type: "object",
    properties: {
        name: {
            type: "string",
        },
        id: {
            type: "string",
        },       
    },    
    required: ["id", "name"],
    additionalProperties: true
}

export default CustomJWTPayloadSchema;