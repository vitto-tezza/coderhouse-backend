
import User from '../services/user.dao.js';
import UserDTO from '../services/user.dto.js';
import errorsDict from '../utils/errors.dict.js';
import { validationResult } from 'express-validator';

const userService = new User();

export const getUsers = async (req, res) => {
    try {
        const result = await userService.getUsers();
        if (!result) return res.status(errorsDict.NO_CONTENT.code).send({ status: 'ERR', error: errorsDict.NO_CONTENT.msg });
        res.status(errorsDict.ALL_OK.code).send({ status: 'OK', result: result });
    } catch (err) {
 
        res.status(errorsDict.INTERNAL.code).send({ status: 'ERROR', result: err.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { uid } = req.params;
        const result = await userService.getUserById(uid);
        if (!result) return res.status(errorsDict.NO_CONTENT.code).send({ status: 'ERR', error: errorsDict.NO_CONTENT.msg });
        res.status(errorsDict.ALL_OK.code).send({ status: 'OK', result: result });
    } catch (err) {
        res.status(errorsDict.INTERNAL.code).send({ status: 'ERROR', result: err.message });
    }
}

export const saveUser = async (req, res) => {

    if (validationResult(req).isEmpty()) {
        try {

            const user = new UserDTO(req.body);
            const userFound = await userService.getUserByEmail(user.email);

            if (userFound) return res.status(errorsDict.ALREADY_REGISTERED.code).send({ status: 'ERR', result: errorsDict.ALREADY_REGISTERED.msg })

            if (req.files['avatar']) user.avatar = req.files['avatar'].name

            const result = await userService.saveUser(user);
            
            res.status(errorsDict.ALL_OK.code).send({ status: 'OK', result: result });
        } catch (err) {
            res.status(errorsDict.INTERNAL.code).send({ status: 'ERROR', result: err.message });
        }
    } else {
        res.status(errorsDict.INCOMPLETE_DATA.code).send({ status: 'ERR', data: validationResult(req).array() })
    }
}