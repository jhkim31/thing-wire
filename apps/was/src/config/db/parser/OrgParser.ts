import { Organization } from "@db/models";
import IOrganization from "shared/interface/organization/IOrganization";

/**
 * Sequelize 의 모델을 내부에서 사용 가능한 인터페이스로 변경한다.
 * 
 * {@link Organization} => {@link IOrganization}
 */
export default function OrgParser (org: Organization): IOrganization {
    const orgInfo: IOrganization = {
        id: org.id,
        name: org.name,
        owner: org.owner
    }
    return orgInfo;
}