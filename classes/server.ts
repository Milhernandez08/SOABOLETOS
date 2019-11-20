import express from 'express';
import socketIO from 'socket.io';

import { SERVER_PORT } from '../global/enviroment';

import http from 'http';

export default class Server {
    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httServer : http.Server;

    private constructor (){
        this.app = express();
        
        this.port = SERVER_PORT;

        this.httServer = new http.Server(this.app);
        this.io = socketIO(this.httServer);
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    start(callback: Function){
        this.httServer.listen(this.port, callback());
    }
}