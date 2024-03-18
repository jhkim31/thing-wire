import { Router } from 'express';
import ConfigFileController from '@controllers/configfile';

/**
 * ## Auth Router
 * ### `/api/v1/auth`
 * * GET `/` getUser
 * * POST `/` postAuth
 * * GET `/logout` logout
*/
const ConfigFileRouter = Router({mergeParams: true});

ConfigFileRouter.get("/", ConfigFileController.getGroupConfigFiles);
ConfigFileRouter.get("/:configfile_id", ConfigFileController.getGroupConfigFile);

export default ConfigFileRouter;
