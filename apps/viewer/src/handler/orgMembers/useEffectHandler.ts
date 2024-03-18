import IUser from 'shared/interface/user/IUser';

import api from '@api';

const handler = (setOrgs: React.Dispatch<React.SetStateAction<IUser[]>>, setAccessDenied: React.Dispatch<React.SetStateAction<boolean>> , orgId: string) => {
    api.get(`/orgs/${orgId}/users`).then((d) => {
        console.log(d);
        if (d.status == 200) {
            if (d.data.header.status === "success") {
                setOrgs(d.data.content.users);
                return;
            }
        }
    })
    .catch(e => {
        setAccessDenied(true);
    })
}

export default handler;