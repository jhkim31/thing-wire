const schema = {
    type: "object",
    properties: {
        // Define your JSON schema properties here
        name: { type: "string" },
        age: { type: "number" },
        // Add more properties as needed
    },
    required: ["name", "age"], // Specify required properties
};


export default schema;