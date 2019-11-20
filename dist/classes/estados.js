"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
const todos = (request, response) => {
    const id_pais = parseInt(request.params.id_pais);
    connection_1.pool.query('SELECT * FROM estado WHERE id_pais=$1', [id_pais], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
const porId = (request, response) => {
    const id = parseInt(request.params.id);
    connection_1.pool.query('SELECT * FROM estado WHERE id=$1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
module.exports = {
    todos,
    porId
};
