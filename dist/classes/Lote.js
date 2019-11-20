"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
const crear = (request, response) => {
    const { id_user, id_pais, id_estado, id_municipio, longitud, latitud, nombre, tipo_suelo, uso_suelo } = request.body;
    const eliminado = 0;
    if (id_user && id_pais && id_estado && id_municipio && longitud && latitud && nombre && tipo_suelo && uso_suelo) {
        connection_1.pool.query('INSERT INTO lote(id_user, id_pais, id_estado, id_municipio, longitud, latitud, nombre, tipo_suelo, uso_suelo, eliminado) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [id_user, id_pais, id_estado, id_municipio, longitud, latitud, nombre, tipo_suelo, uso_suelo, eliminado], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json("lote Creado con Exito");
        });
    }
    else {
        response.status(200).json("se requiere id_user, id_pais, id_estado, id_municipio, longitud, latitud, nombre, tipo_suelo, uso_suelo");
    }
};
// id_user, id_pais, id_estado, id_municipio, longitud, latitud, nombre, tipo_suelo, uso_suelo #Crear una tabla de tipo de suelo
const todos = (request, response) => {
    connection_1.pool.query('SELECT * FROM lote l INNER JOIN usuario u ON l.id_user=u.id INNER JOIN pais p ON l.id_pais=p.id INNER JOIN estado e ON l.id_estado=e.id INNER JOIN municipio m ON l.id_municipio=m.id  WHERE eliminado=0', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
const porId = (request, response) => {
    const id = parseInt(request.params.id);
    connection_1.pool.query('SELECT * FROM lote l INNER JOIN usuario u ON l.id_user=u.id INNER JOIN pais p ON l.id_pais=p.id INNER JOIN estado e ON l.id_estado=e.id INNER JOIN municipio m ON l.id_municipio=m.idWHERE id=$1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
const editar = (request, response) => {
    const id = parseInt(request.params.id);
    const { id_user, id_pais, id_estado, id_municipio, longitud, latitud, nombre, tipo_suelo, uso_suelo } = request.body;
    if (id_user && id_pais && id_estado && id_municipio && longitud && latitud && nombre && tipo_suelo && uso_suelo) {
        connection_1.pool.query('UPDATE lote SET id_user=$1, id_pais=$2, id_estado=$3, id_municipio=$4, longitud=$5, latitud=$6, nombre=$7, tipo_suelo=$8, uso_suelo=$9 WHERE id=$10', [id_user, id_pais, id_estado, id_municipio, longitud, latitud, nombre, tipo_suelo, uso_suelo, id], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json("Usuario Actualizado");
        });
    }
    else {
        response.status(200).json("Se requiere id_user, id_pais, id_estado, id_municipio, longitud, latitud, nombre, tipo_suelo, uso_suelo");
    }
};
const eliminar = (request, response) => {
    const id = parseInt(request.params.id);
    if (id) {
        connection_1.pool.query('UPDATE lote SET eliminado=1 WHERE id=$1', [id], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json("Se elimino correctamente");
        });
    }
    else {
        response.status(200).json("Error al eliminar");
    }
};
module.exports = {
    crear,
    todos,
    porId,
    editar,
    eliminar
};
