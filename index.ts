import bodyParser from 'body-parser';
import cors from 'cors';

import Server from './classes/server';
import router from './routes/router';

import { SERVER_PORT } from './global/enviroment';

const server = Server.instance;
//Configurarción de cors
server.app.use(cors());
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());



//Asginando Servicios de Rutas
server.app.use('/', router);

server.start(() => {
    console.log(`Servidor Corriendo en el puerto ${SERVER_PORT}`);
});
