import { Request, Response, NextFunction } from 'express';
import l from './logger';

export function debugResponse(req:Request, res:Response, next: NextFunction) {
    if (req.method !=='OPTIONS') {
    l.debug('Response : ', res.statusCode);
    }
    next();
}