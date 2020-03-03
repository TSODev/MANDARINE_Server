
import { decodeJwt} from '../authentication/security.utils';
import { Request, Response, NextFunction } from 'express';
import l from './logger';
import { renewSessionToken } from '../authentication/security.utils';

export function retrieveUserIdFromRequest(req: Request, res: Response, next: NextFunction) {

//    l.debug('Received Cookies : ', req.cookies);
    const jwt = req.cookies["SESSIONID"];
    if (jwt) {
//        l.debug("SESSIONID:", jwt);
        handleSessionCookie(jwt, req)
            .then(async () => {
                if (process.env.SESSION_AUTO_RENEW === 'true') {
                    if (req.url.toString() !== '/api/v1/logout'){
                        l.debug('[SESSIONCOOKIE] - Renew Web Token');
                        const sessionToken = await renewSessionToken(req['userId']);
                        res.cookie("SESSIONID", sessionToken, {httpOnly:true, secure:true});
                    }
                }
                next();
            })
            .catch(err => {
                l.error('[SESSIONCOOKIE] - retrieve user middleware', err);
                next();
            })
    } else {
//        l.debug('[SESSIONCOOKIE] - No token in cookies...');
        next();
    }
}

async function handleSessionCookie(jwt:string, req: Request) {
//    l.debug('In HandleSessionCookies');
    try {
        const payload = await decodeJwt(jwt);
        req["userId"] = payload;
    }
    catch(err) {
        l.error("[SESSIONCOOKIE] - Error: Could not extract user from request :", err.message);
    }
}