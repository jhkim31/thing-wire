import logger from '@logger';
import Ajv from 'ajv';
import CustomJWTPayloadSchema from 'shared/schema/CustomJWTPayloadSchema';
import StringArraySchema from 'shared/schema/StringArraySchema';
import UserAuthSchema from 'shared/schema/UserAuthSchema';


/**
 * # AJV Instance
 * ## Schema List
 * * UserAuthSchema 
 * * StringArraySchema
 * * CustomJWTPayloadSchema
 */
const ajv = new Ajv();

ajv.addSchema(UserAuthSchema);
ajv.addSchema(StringArraySchema);
ajv.addSchema(CustomJWTPayloadSchema);

logger.info(`ajv ready`);
export default ajv;