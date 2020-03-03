import { Request, Response, NextFunction } from 'express';
import l from './logger';

export function httpLogger(req:Request, res:Response, next: NextFunction) {
//     if (req.method !=='OPTIONS') {
     l.debug('[HTTPLOGGER] - ', req.method + " - " + req.url);
//     }
    if (process.env.NODE_ENV === 'development') {
      setTimeout(function () {
        l.debug('[HTTPLOGGER] - 300ms delaying...');
        next();
      }, 300)
    }
    else next();

//    next();
}