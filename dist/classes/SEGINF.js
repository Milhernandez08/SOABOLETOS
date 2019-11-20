"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
const cry = require('crypto');
function proteger(pass) {
    const secret = 'abcdefghijklm@*+-{';
    const hash = cry.createHmac('sha256', secret).update(pass).digest('hex');
    return hash;
}
const login = (request, response) => {
    const { correo, pass } = request.body;
    if (correo && pass) {
        connection_1.pool.query('SELECT * FROM usuario WHERE correo = $1 AND pass = $2', [correo, proteger(pass)], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json("Se logeo con exito");
        });
    }
    else {
        response.status(200).json("Error al iniciar sesion");
    }
};
const todos = (request, response) => {
    connection_1.pool.query('SELECT * FROM usuario', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
module.exports = {
    login,
    todos
};
