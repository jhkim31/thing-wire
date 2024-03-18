"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const configfile_1 = __importDefault(require("@controllers/configfile"));
/**
 * ## Auth Router
 * ### `/api/v1/auth`
 * * GET `/` getUser
 * * POST `/` postAuth
 * * GET `/logout` logout
*/
const ConfigFileRouter = (0, express_1.Router)({ mergeParams: true });
ConfigFileRouter.get("/", configfile_1.default.getGroupConfigFiles);
ConfigFileRouter.get("/:configfile_id", configfile_1.default.getGroupConfigFile);
exports.default = ConfigFileRouter;
//# sourceMappingURL=configfile.router.js.map