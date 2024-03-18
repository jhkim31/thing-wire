import IConfigFile from "shared/interface/configfile/IConfigFile";
import getGroupConfigFiles from "./getGroupConfigFiles";
import getGroupConfigFile from "./getGroupConfigFile";

export default class ConfigFileService {
    static async getGroupConfigFiles(groupId: string): Promise<IConfigFile[]> {
        return await getGroupConfigFiles(groupId);
    }

    static async getGroupConfigFile(groupId: string, configFileId: string): Promise<IConfigFile> {
        return await getGroupConfigFile(groupId, configFileId);
    }
}