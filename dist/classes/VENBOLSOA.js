"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
const stripe = require('stripe')('sk_test_fHRgH5x5po1bXoj8ObzdWxc900u2Yh8Rt4');
const SQL = require('../classes/SENTENCIAS/SQL');
var total;
const CREAR = (request, response) => {
    const { nombre_cliente, correo_cliente, metodo_pago, tipo_boleto, fecha_salida, fecha_regreso, num_aciento_cliente, costo, autobus_id } = request.body;
    if (nombre_cliente && correo_cliente && metodo_pago && tipo_boleto &&
        fecha_salida && fecha_regreso && num_aciento_cliente && costo && autobus_id) {
        var pago = 0;
        let tipo;
        var num_acientos_ocupados = 0;
        var num_acientos_disponibles = 0;
        connection_1.pool.query(SQL.DESCUENTO, [autobus_id], (error, results) => {
            if (error)
                throw error;
            tipo = results.rows;
            if (tipo[0]['tipo_bus'] === 1)
                pago = parseFloat(costo) + 15 + (15 * 0.16);
            if (tipo[0]['tipo_bus'] === 2)
                pago = parseFloat(costo) + 10 + (10 * 0.16);
            if (tipo[0]['tipo_bus'] === 3)
                pago = parseFloat(costo) + 5 + (5 * 0.16);
            if (tipo_boleto === 1)
                pago = pago - (pago * 0.09);
            const x = pago.toString();
            var num_acientos_ocupados = parseInt(tipo[0]['num_acientos_ocupados']) + 1;
            var num_acientos_disponibles = parseInt(tipo[0]['num_acientos_disponibles']) - 1;
            connection_1.pool.query(SQL.UPDATEASIENTOS, [num_acientos_disponibles, num_acientos_ocupados, autobus_id], (error, results) => {
                if (error)
                    throw error;
            });
            connection_1.pool.query(SQL.INSERTAR, [nombre_cliente, correo_cliente, metodo_pago, tipo_boleto, fecha_salida,
                fecha_regreso, num_aciento_cliente, x, autobus_id], (error, results) => {
                if (error) {
                    throw error;
                }
                response.status(200).json(results.rows);
            });
        });
    }
};
const EDITAR = (request, response) => {
    const id = parseInt(request.params.id);
    const { nombre_cliente, correo_cliente, metodo_pago, tipo_boleto, fecha_salida, fecha_regreso, num_aciento_cliente, costo, autobus_id } = request.body;
    if (nombre_cliente && correo_cliente && metodo_pago && tipo_boleto &&
        fecha_salida && fecha_regreso && num_aciento_cliente && costo && autobus_id) {
        connection_1.pool.query(SQL.ACTUALIZAR, [id, nombre_cliente, correo_cliente, metodo_pago, tipo_boleto, fecha_salida,
            fecha_regreso, num_aciento_cliente, costo, autobus_id], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        });
    }
};
const TODOS = (request, response) => {
    var tipo = 0;
    connection_1.pool.query("SELECT tipo_bus FROM autobuses WHERE id=2", (error, results) => {
        if (error)
            throw error;
        tipo = results.rows;
        console.log(tipo[0]['tipo_bus']);
    });
    connection_1.pool.query(SQL.SELECTALL, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
const CORREO = (request, response) => {
    const correo_cliente = parseInt(request.params.correo_cliente);
    connection_1.pool.query(SQL.SELECTEMAIL, [correo_cliente], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
const ASIENTO = (request, response) => {
    const num_aciento_cliente = parseInt(request.params.num_aciento_cliente);
    connection_1.pool.query(SQL.SELECTACIENTO, [num_aciento_cliente], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
const PORID = (request, response) => {
    const id = parseInt(request.params.id);
    connection_1.pool.query(SQL.SELECTALL, [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
const ELIMINAR = (request, response) => {
    const id = parseInt(request.params.id);
    connection_1.pool.query(SQL.ACTUALIZAR, [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
const PAGO = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(request.body['correo']);
    console.log(request.body['token']);
    var total = request.body['total'];
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const cliente = yield stripe.customers.create({
            name: request.body['nombre'],
            email: request.body['correo'],
        });
    }))();
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const charge = yield stripe.charges.create({
            amount: +total * 100,
            currency: 'MXN',
            description: 'Example charge',
            source: request.body['token'],
            statement_descriptor: 'Custom descriptor',
        });
    }))();
    response.status(200).json(1);
});
// const crear = (request, response) => {
//     const { nombre_cliente, correo, metodo_pago, tipo_boleto, fecha_salida, fecha_regreso, num_asiento_cliente, costo } = request.body;
//     if ( nombre_cliente && correo && metodo_pago && tipo_boleto && fecha_salida && fecha_regreso && num_asiento_cliente && costo ){
//         pool.query( 'INSERT INTO boletos(nombre_cliente, correo, metodo_pago, tipo_boleto, fecha_salida, fecha_regreso, num_asiento_cliente, costo) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
//         [nombre_cliente, correo, metodo_pago, tipo_boleto, fecha_salida, fecha_regreso, num_asiento_cliente, costo], ( error, results ) => {
//             if (error){
//                 throw error;
//             }
//             response.status(200).json("muestra Creado con Exito");
//         });
//     }else{
//         response.status(200).json("VERIFIQUE SI TODOS LOS CAMPOS ESTAN LLENOS CORRECTAMENTE");
//     }
// };
// const editar;
// const eliminar;
// const todos;
// const id;
const all = (request, response) => {
    connection_1.pool.query('SELECT * FROM boletos', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
module.exports = {
    CREAR,
    EDITAR,
    TODOS,
    CORREO,
    ASIENTO,
    PORID,
    ELIMINAR,
    all,
    PAGO
};
