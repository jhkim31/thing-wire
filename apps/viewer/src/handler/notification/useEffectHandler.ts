import INotification from 'shared/interface/notification/INotification';

import api from '@api';

const handler = (setNotis: React.Dispatch<React.SetStateAction<INotification[]>>) => {
    api.get("/notis").then((d) => {
        console.log(d);
        if (d.status == 200) {
            if (d.data.header.status === "success") {
                setNotis(d.data.content);
            }
        }
    });
}

export default handler;