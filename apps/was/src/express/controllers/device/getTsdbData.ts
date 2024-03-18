import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import createResponseMessage from 'shared/lib/createResponseMessage';

export default async function getTsdbData(req: Request, res: Response, next: NextFunction) {
    try {        
        // const deviceId = req.params.device_id;     
        const deviceId = `12:34:56:AA:01:85`;
        const startAt = req.query.startAt;

        let downsample = "";
        switch (startAt) {
            case "5m-ago":
                downsample = "";
                break;
            case "1h-ago":
                downsample = "1m-avg-none:";
                break;
            case "12h-ago":
                downsample = "30m-avg-none:";
                break;
            case "1d-ago":
                downsample = "1h-avg-none:";
                break;
        }

        const url = `http://io.energyiotlab.com:54242/api/query?m=sum:${downsample}keti-f4{mac=floe${deviceId.split(':')[4]}${deviceId.split(':')[5]},sensor=*}&start=${startAt}`;
        const tsdbData = await axios.get(url).then(d => d.data);
        console.log(tsdbData);
        res.status(200).send(createResponseMessage("success", "success", tsdbData));
    } catch (error) {
        next(error);
    }
}