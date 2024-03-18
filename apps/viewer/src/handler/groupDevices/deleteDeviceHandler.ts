import axiosInstance from "@api";

export default function deleteGroup(selectDeviceName: string, selectDeviceId: string, groupId: string) {
    const isDelete = window.confirm(`${selectDeviceName} 장치를 삭제하시겠습니까?`);
    if (isDelete) {
        axiosInstance.delete(`/devices/${selectDeviceId}`).then((d) => {
            console.log(d);
            window.location.replace(`/groups/${groupId}`);
        });
    }
}
