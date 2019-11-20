"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
/* INICIO PARA CREAR MUESTRA */
const crear = (request, response) => {
    const { id_lote, loc_gps, profundidad, fecha, asnm, clima, uso_suelo, tipo_suelo } = request.body;
    if (id_lote && loc_gps && profundidad && fecha && asnm && clima && uso_suelo && tipo_suelo) {
        connection_1.pool.query('INSERT INTO muestra(id_lote, loc_gps, profundidad, fecha, asnm, clima, uso_suelo, tipo_suelo) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)', [id_lote, loc_gps, profundidad, fecha, asnm, clima, uso_suelo, tipo_suelo], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json("muestra Creado con Exito");
        });
    }
    else {
        response.status(200).json("se requiere id_lote, loc_gps, profundidad, fecha, asnm, clima, uso_suelo, tipo_suelo");
    }
};
/* FIN PARA CREAR MUESTRA */
/* INICIO PARA OBTENER MUESTRA */
const todos = (request, response) => {
    connection_1.pool.query('SELECT * FROM muestra m INNER JOIN lote l ON m.id_lote=l.id', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
const porId = (request, response) => {
    const id = parseInt(request.params.id);
    connection_1.pool.query('SELECT * FROM muestra m INNER JOIN lote l ON m.id_lote=l.id WHERE id=$1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
/* FIN PARA OBTENER MUESTRA */
/* INICIO PARA EDITAR MUESTRA */
const editar = (request, response) => {
    const id = parseInt(request.params.id);
    const { loc_gps, profundidad, fecha, asnm, clima, uso_suelo, tipo_suelo } = request.body;
    if (loc_gps && profundidad && fecha && asnm && clima && uso_suelo && tipo_suelo) {
        connection_1.pool.query('UPDATE muestra SET pais=$1, estado=$2, municipio=$3, nombre_lugar=$4 WHERE id=$5', [loc_gps, profundidad, fecha, asnm, clima, uso_suelo, tipo_suelo, id], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json("Muestra Actualizada");
        });
    }
    else {
        response.status(200).json("Se requiere loc_gps, profundidad, fecha, asnm, clima, uso_suelo, tipo_suelo");
    }
};
/* FIN PARA EDITAR MUESTRA */
/* INICIO PARA ELIMINAR MUESTRA */
const eliminar = (request, response) => {
    const id = parseInt(request.params.id);
    connection_1.pool.query('DELETE FROM muestra WHERE id=$1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json("Se Elimino la muestra Correctamente");
    });
};
/* FIN PARA ELIMINAR MUESTRA */
module.exports = {
    crear,
    todos,
    porId,
    editar,
    eliminar
};
