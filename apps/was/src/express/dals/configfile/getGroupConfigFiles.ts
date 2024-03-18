import { ConfigFile, Group, User } from "@db/models";
import { group } from "console";
import { SequelizeError } from "shared/Error";

export default async function getGroupConfigFiles(groupId: string): Promise<ConfigFile[]> {
    const configFiles = await ConfigFile.findAll({
        where: {
            groupId: groupId
        },
        include: [
            {
                model: User,
                as: "modifier"
            }
        ]
    });

    return configFiles;
}