import axiosInstance from '@api';

export default function deleteGroup(selectGroupName: string, selectGroupId: string, orgId: string) {
    const isDelete = window.confirm(`${selectGroupName} 그룹을 삭제하시겠습니까?`);
    if (isDelete) {
        axiosInstance.delete(`/groups/${selectGroupId}`).then((d) => {
            console.log(d);
            window.location.replace(`/orgs/${orgId}`);
        });
    }
}
