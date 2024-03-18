import { ConfigFile } from "@db/models";
import getGroupConfigFiles from "./getGroupConfigFiles";
import getGroupConfigFile from "./getGroupConfigFile";

export default class ConfigFileDal {
    static async getGroupConfigFiles(groupId: string): Promise<ConfigFile[]>{
        return await getGroupConfigFiles(groupId);
    }

    static async getGroupConfigFile(groupId: string, configFileId: string): Promise<ConfigFile>{
        return await getGroupConfigFile(groupId, configFileId);
    }
}