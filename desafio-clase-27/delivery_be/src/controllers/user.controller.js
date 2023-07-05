import User from '../services/user.dao.js';

const userService = new User();

export const getUsers = async (req, res) => {
    const result = await userService.getUsers();
    if (!result) return res.status(500).send({ status: 'ERR', error: 'No se pudo recuperar la lista' });
    res.status(200).send({ status: 'OK', result: result });
}

export const getUserById = async (req, res) => {
    const { uid } = req.params;
    const result = await userService.getUserById(uid);
    if (!result) return res.status(500).send({ status: 'ERR', error: 'No se pudo recuperar la lista' });
    res.status(200).send({ status: 'OK', result: result });
}

export const saveUser = async (req, res) => {
    const user = req.body;
    const result = await userService.saveUser(user);
    res.status(200).send({ status: 'OK', result: result });
}