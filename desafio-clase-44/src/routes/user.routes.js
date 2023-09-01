import { Router } from 'express';
import passport from '../auth/passport.strategies.js';
import applyPolicy from '../auth/local.policies.js'
import { getUsers, getUserById, saveUser } from '../controllers/user.controller.js';

import { body } from 'express-validator';
import errorsDict from '../utils/errors.dict.js';
import { __dirname } from '../utils.js';


const validateCreateFields = [
    body('name').exists().isLength({ min: 2, max: 32 }).withMessage('El nombre debe tener entre 2 y 32 caracteres'),
    body('email').exists().isEmail().withMessage('El formato de mail no es válido'),
    body('pass').exists().isLength({ min: 6, max: 12 }).withMessage('La clave debe tener entre 6 y 12 caracteres')
]


const handleUploads = (files) => {
    return (req, res, next) => {
        for (const file of files) {
            const fileToUpload = req.files[file]
            
            fileToUpload.mv(`${__dirname}/${process.env.UPLOAD_DIR}/${fileToUpload.name}`, function (err) {
                if (err) return res.status(errorsDict.INTERNAL.code).send({ status: 'ERROR', result: 'Error al subir archivos' });
            })
        }

        next()
    }
}

export const userRoutes = ()  => {
    const router = Router();

    router.get('/', getUsers);
    router.get('/one/:uid', getUserById);
    

    router.get('/loginfrm', (req, res) => res.render('login'))
    router.get('/logoutfrm', (req, res) => { req.session.user = {}; res.render('login') })

    router.post('/', validateCreateFields, handleUploads(['avatar']), saveUser);
    

    router.post('/login', passport.authenticate('login', { failureRedirect: '/api/users/loginfrm' }), async (req, res) => {
        req.user.pass = ''
        req.session.user = req.user
        res.render('private', { user: { name: req.user.name, email: req.user.email } })
    })


    router.get('/admin', applyPolicy('ADMIN'), (req, res) => {
        res.render('admin', { user: { name: req.session.user.name, email: req.session.user.email } })
    })
    
    return router;
}