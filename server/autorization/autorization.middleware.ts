import { Request, Response, NextFunction} from 'express';
import * as _ from 'lodash';
import l from '../common/logger';

 export function checkIfAuthorized(
     allowedRoles: string[], 
     req: Request, 
     res: Response, 
     next: NextFunction) 
        {
            const userInfo = req['userId'];
            const roles = _.intersection(userInfo.roles, allowedRoles);

            if (roles.length > 0) {
                next();
            }
            else {
                l.debug('Unauthorized');
                res.sendStatus(403);
            }

        }