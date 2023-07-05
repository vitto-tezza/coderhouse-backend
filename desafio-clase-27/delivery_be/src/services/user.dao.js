import mongoose from 'mongoose';
import userModel from '../models/user.dbmodel.js';

export default class User {
    getUsers = async () => {
        try {
            return await userModel.find();
        } catch(err) {
            console.log(err.message);
            return null;
        }
    }

    getUserById = async (id) => {
        try {
            return await userModel.findOne({ _id: id });
        } catch(err) {
            console.log(err.message);
            return null;
        }
    }

    saveUser = async (user) => {
        try {
            return await userModel.create(user);
        } catch(err) {
            console.log(err.message);
            return null;
        }
    }

  /*   updateUser = async (id, user) => {
        try {
            return await userModel.updateOne({ _id: id }, {$set: user });
        } catch(err) {
            console.log(err.message);
            return null;
        }
    } */
}