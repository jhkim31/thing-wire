import { ConfigFile } from "@db/models";
import IConfigFile from "shared/interface/configfile/IConfigFile";
import IUser from "shared/interface/user/IUser";

/**
 * Sequelize 의 모델을 내부에서 사용 가능한 인터페이스로 변경한다.
 * 
 * {@link ConfigFile} => {@link IConfigFile}
 */
export default function ConfigFileParser(configFile: ConfigFile): IConfigFile {         
    const modifier: IUser = {
        id: configFile.modifier?.id ?? "",
        name: configFile.modifier?.name ?? ""        
    }
    const configFileInfo: IConfigFile = {
        id: configFile.id,
        name: configFile.name,    
        comment: configFile.comment, 
        data: configFile.data,
        modifier: modifier,
        updatedAt: configFile.updatedAt.getTime()        
    }
    return configFileInfo;
}