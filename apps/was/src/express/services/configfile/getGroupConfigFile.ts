import ConfigFileDal from "@dals/configfile";
import { ConfigFile } from "@db/models";
import ConfigFileParser from "@db/parser/ConfigFileParser";
import IConfigFile from "shared/interface/configfile/IConfigFile";

export default async function getGroupConfigFile(groupId: string, configFileId: string): Promise<IConfigFile> {
    const configFile: ConfigFile = await ConfigFileDal.getGroupConfigFile(groupId, configFileId);
    const configFileInfo = ConfigFileParser(configFile);

    return configFileInfo;
}