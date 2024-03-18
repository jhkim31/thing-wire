import IDevice from 'shared/interface/device/IDevice';

import axiosInstance from '@api';

const handler = (setOrgs: React.Dispatch<React.SetStateAction<IDevice[]>>, groupId: string) => {
    axiosInstance.get(`groups/${groupId}/devices`).then((d) => {
        console.log(d);
        if (d.status == 200) {
            if (d.data.header.status === "success") {
                setOrgs(d.data.content);
            }
        }
    });
}

export default handler;