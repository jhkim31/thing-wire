import axiosInstance from "@api";

const handler = (setTables: React.Dispatch<React.SetStateAction<string[][]>>, setHeader: React.Dispatch<React.SetStateAction<string[]>>, setAccessDenied: React.Dispatch<React.SetStateAction<boolean>>) => {
    axiosInstance.get(`devices/`)
        .then((d) => {
            if (d.status == 200) {
                setHeader(d.data.header);
                setTables(d.data.data);
            }
        })
        .catch(e => {
            setAccessDenied(true);
        })
};

export default handler;
