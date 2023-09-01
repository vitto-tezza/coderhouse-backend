import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { engine } from 'express-handlebars';
import config from './config.js';
import { userRoutes } from './routes/user.routes.js';
import passport from './auth/passport.strategies.js';
import { __dirname } from './utils.js';
import CustomError from './services/customerror.class.js';
import errorsDict from './utils/errors.dict.js';
import fileUpload from 'express-fileupload';



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles : true, tempFileDir : '/temp' }))
app.use(cors({
    origin: config.ALLOWED_ORIGINS,
    methods: 'GET,PUT,POST,DELETE',
}));

app.use(session({ secret: config.SECRET, resave: true, saveUninitialized: true }) );
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', userRoutes());

app.all('*', (req, res, next) => {
    throw new CustomError(errorsDict.NO_ROUTING);
});

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);


try {
    app.listen(config.SERVER_PORT, () => {
        console.log(`Servidor iniciado en puerto ${config.SERVER_PORT}`);
    });
} catch(err) {
    console.error(`No se puede iniciar el servidor (${err.message})`);
}