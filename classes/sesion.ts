import { pool } from "./connection";
const cry = require('crypto');

function proteger(pass) {
    const secret = 'abcdefghijklm@*+-{';
    const hash = cry.createHmac('sha256', secret).update(pass).digest('hex');
    return hash;
}

const login = (request, response) => {
    const { correo, contrasena } = request.body;
    if ( correo && contrasena ) {
        pool.query('SELECT * FROM usuario WHERE correo = $1 AND contrasena = $2 AND activo=1',
        [correo, proteger(contrasena)], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        });
    }
    else {
        response.status(200).json("se requiere: correo, contrasena");
    }
}

const crear = (request, response) => {
    const { img_perfil, nombre, ape_pat, ape_mat, correo, contrasena, id_pais, id_estado, id_municipio, direccion, telefono, rol, id_lider } = request.body;
    const activo = 0;
    const eliminado = 0;

    if (img_perfil && nombre && ape_pat && ape_mat && correo && contrasena && id_pais && id_estado && id_municipio && direccion && telefono && rol && id_lider) {
        pool.query('INSERT INTO usuario(img_perfil, nombre, ape_pat, ape_mat, correo, contrasena, id_pais, id_estado, id_municipio, direccion, telefono, rol, id_lider, activo, eliminado) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
        [img_perfil, nombre, ape_pat, ape_mat, correo, proteger(contrasena), id_pais, id_estado, id_municipio, direccion, telefono, rol, id_lider, activo, eliminado], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json("Usuario Creado con Exito");
        });
    }
    else {
        response.status(200).json("se requiere img_perfil, nombre, ape_pat, ape_mat, correo, contrasena, id_pais, id_estado, id_municipio, direccion, telefono, rol, id_lider");
    }
}


module.exports = {
    login,
    crear
}