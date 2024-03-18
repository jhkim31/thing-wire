import { useParams } from 'react-router-dom';

import GroupList from '@components/modules/org/GroupList';

const OrgGroupsPage = () => {
    const params = useParams();
    const orgId = params.org_id ?? "";
    return (
        <div>
            <h1> Org Group Page</h1>
            <div>
            <a href={`/orgs/${orgId}/groups/new`}>새 그룹 추가</a>
            </div>
            <GroupList/>
        </div>
    );
};

export default OrgGroupsPage;
