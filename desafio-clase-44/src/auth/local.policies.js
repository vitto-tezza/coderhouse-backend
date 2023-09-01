import errorsDict from '../utils/errors.dict.js';

const applyPolicy = (roles) => {
    return (req, res, next) => {
        if(req.session.user && Object.keys(req.session.user).length > 0 && roles[0].toUpperCase() === 'ADMIN') return next();
        

        if (!req.session.user || Object.keys(req.session.user).length === 0) return res.status(errorsDict.UNAUTHORIZED.code).send( {status: 'ERR', result: errorsDict.UNAUTHORIZED.msg })
        
        if(!roles.includes(req.session.user.role.toUpperCase())) return res.status(errorsDict.FORBIDDEN.code).send({ status: 'ERR', result: errorsDict.FORBIDDEN.msg })
        
        next();
    }
}

export default applyPolicy;