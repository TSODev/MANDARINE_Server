import express from 'express';
import * as _ from 'underscore';

import usercontroller from './user.controller';
import { checkIfAuthenticated } from '../../../authentication/auth.middleware';
import { checkCsrfToken } from '../../../common/csrf.middleware';
import { checkIfAuthorized } from '../../../autorization/autorization.middleware';
import l from '../../../common/logger';

var router = express.Router();

    router
    .post('/signup', usercontroller.createUser)
    .post('/login', usercontroller.login)
    .post('/logout', checkIfAuthenticated, checkCsrfToken, usercontroller.logout)
    .get('/content', checkIfAuthenticated, usercontroller.getContent)
    .get('/user', checkIfAuthenticated, usercontroller.getUser)                       // Get user email address from SESSIONID cookie
    .get('/user/:id', checkIfAuthenticated, usercontroller.getUserById)
    .get('/user/email/:email', checkIfAuthenticated,usercontroller.getUserByEmail)
    .get('/users', checkIfAuthenticated, usercontroller.getAllUsersInTenant)
    .delete('/user/:id', checkIfAuthenticated,
                    _.partial(checkIfAuthorized,(['ADMIN']))
                    , usercontroller.deleteUser)
    .put('/user/:id', checkIfAuthenticated, usercontroller.updateUserById)
    .get('/user/whoami', checkIfAuthenticated, usercontroller.whoAmI)

export default router;
