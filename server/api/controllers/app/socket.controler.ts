import { Request, Response } from 'express';
import l from '../../../common/logger';

export class socketControler {

    async getSampleSocket(req: Request, res: Response) {
        res.status(200).json({response: 'GET SocketIO - OK'});
      }

      async setSampleSocket(req: Request, res: Response) {
        res.status(200).json({response: 'SET SocketIO - OK'});
      }
    
}

export default new socketControler();
