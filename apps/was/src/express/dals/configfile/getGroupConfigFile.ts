import { ConfigFile, Group, User } from "@db/models";
import { group } from "console";
import { SequelizeError } from "shared/Error";

export default async function getGroupConfigFile(groupId: string, configFileId: string): Promise<ConfigFile> {
    const configFile = await ConfigFile.findByPk(configFileId, {
        include: [
            {
                model: User,
                as: "modifier"
            }
        ]
    })

    if (configFile === null) {
        throw new SequelizeError(`ConfigFile을 찾지 못했습니다  (group, configfile) : (${groupId}, ${configFileId})`);
    }

    return configFile;
}