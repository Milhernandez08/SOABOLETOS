"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
const crear = (request, response) => {
    const { nombre } = request.body;
    if (nombre) {
        connection_1.pool.query('INSERT INTO pais (nombre) VALUES ($1)', [nombre], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json("Se agrego un pais correctamente");
        });
    }
    else {
        response.status(200).json("Se requiere nombre para poder registrar un pais nuevo");
    }
};
const editar = (request, response) => {
    const id = parseInt(request.params.id);
    const { nombre } = request.body;
    if (nombre) {
        connection_1.pool.query('UPDATE pais SET nombre=$1 WHERE id=$2', [nombre, id], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json("Pais Actualizado");
        });
    }
    else {
        response.status(200).json("Error al Actualizar");
    }
};
const eliminar = (request, response) => {
    const id = parseInt(request.params.id);
    connection_1.pool.query('DELETE FROM pais WHERE id=$1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json("Pais se elimino correctamente");
    });
};
const todos = (request, response) => {
    connection_1.pool.query('SELECT * FROM pais', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
const porId = (request, response) => {
    const id = parseInt(request.params.id);
    connection_1.pool.query('SELECT * FROM pais WHERE id=$1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
module.exports = {
    crear,
    editar,
    eliminar,
    todos,
    porId
};
