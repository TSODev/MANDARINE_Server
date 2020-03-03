import { Model, Schema, Document, model } from 'mongoose';

export interface IUser {
    user_id: string,
    email: string,
    domain: string,
    company: string,
    passwordDigest: string,
    firstname: string,
    lastname: string,
    roles: string[],
    license: string,
    lastLogin: Date,
    createdDate: Date
}

export interface IUserModel extends IUser, Document{
}

export const UserSchema: Schema = new Schema({
    user_id: String,
    email: String,
    domain: String,
    company: String,
    passwordDigest: String,
    firstname: String,
    lastname: String,
    roles: [String],
    license: String,
    lastLogin: Date,
    createDate: Date
});

  // assign a function to the "methods" object of our usersSchema
  UserSchema.methods.GetDomainName = function(email:string) {
    const mark = email.search('(?<=@)[^.]*.[^.]*(?=\.)');
    return email.substring(mark);
  };

//>>> This is the one that export the User Model
export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema)