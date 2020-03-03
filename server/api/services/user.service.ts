

import l from '../../common/logger';
import mongoose from 'mongoose';
import { User, UserSchema, IUser } from '../models/users.model';
import * as _ from 'lodash';


class InMongoDatabase {



    isAdmin(user: IUser) {
        return ((_.intersection(user.roles, ['ADMIN'])).length > 0);
      }


    async createUser(credentials, passwordDigest: string){
        const usersPerEmail = await dbUser.findUserByEmail(credentials.email)
        if (usersPerEmail) {
            const message = "An user already exists with email " + credentials.email;
            l.error(message);
            throw new Error(message);
        }

        const id = this.uuidv4();

        let user = new User({
            user_id: id,
            email: credentials.email,
            passwordDigest: passwordDigest,
            lastname: credentials.lastName,
            firstname: credentials.firstName,
            company: credentials.company,
            roles: credentials.roles,
            groups: credentials.groups,
        });
        user.domain = UserSchema.methods.GetDomainName(user.email);
        user.roles.push('VIEWER');                                      //default role is VIEWVER
        user.save();
        return user;        
    }

    async updateUser(id: string, user: IUser) {
        let doc = await(User.findOneAndUpdate(
            {user_id: id},
            {
                email: user.email,
                lastname: user.lastname,
                firstname: user.firstname,
                company: user.company,
                roles: user.roles,
            },
            ));
        return user;
    }


    async findUserByEmail(email: string): Promise<IUser> {
        return await User.findOne({email: email});
    }

    async findUserById(userId:string): Promise<IUser>{
        return await User.findOne({user_id: userId});
    }

    async findUserByName(fullName: string): Promise<IUser> {
        const firstname = fullName.split(' ').slice(0, -1).join(' ');
        const lastname = fullName.split(' ').slice(-1).join(' ');
        return await User.findOne({firstname, lastname})
      }

    async findAllUsers(): Promise<IUser[]> {
        return await User.find();
    }


    async findAllUsersForTenant(userId: string) {
        const user = await dbUser.findUserById(userId);
        if (this.isAdmin(user)){
            return await User.find();
        } else {
            return await User.find({company: user.company});
        }
    }
    async deleteUser(id: string): Promise<IUser> {
        l.debug('Deleting userId : ', id);
        return await User.findOneAndDelete({user_id: id});
    }

    // async addUserInGroup(userId: string, groupId: string){
    //     l.debug('Adding userId : ', userId, ' in groupId : ', groupId );
    //     await User.findOne({user_id: userId}, (update) => {
    //         update.groups.push(groupId);
    //         return User.findOneAndUpdate({user_id: userId}, update);
    //     })

    // }

    // async findUsersInGroup(groupId: string): Promise<IUser> {
    //     l.debug('Getting Users in Group : ', groupId);
    //     await User.find({user.groups})
    // }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }

}


export const dbUser = new InMongoDatabase();


