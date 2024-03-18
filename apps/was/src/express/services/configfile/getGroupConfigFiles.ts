import ConfigFileDal from "@dals/configfile";
import { ConfigFile } from "@db/models";
import ConfigFileParser from "@db/parser/ConfigFileParser";
import IConfigFile from "shared/interface/configfile/IConfigFile";

export default async function getGroupConfigFiles(groupId: string): Promise<IConfigFile[]> {
    const configFiles: ConfigFile[] = await ConfigFileDal.getGroupConfigFiles(groupId);
    const configFileInfos = configFiles.map(configFile => ConfigFileParser(configFile));

    return configFileInfos;
}