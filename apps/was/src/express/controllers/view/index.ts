import { Request, Response } from 'express';
import staticPath from 'shared/lib/staticPath';

export default class ViewController {
    async mainPage(req: Request, res: Response) {
        res.sendFile(staticPath('./public/mainpage.html'));
    }
}