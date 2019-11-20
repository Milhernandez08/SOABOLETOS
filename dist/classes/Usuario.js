"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
const todos = (request, response) => {
    connection_1.pool.query('SELECT * FROM usuario u INNER JOIN pais p ON u.id_pais=p.id INNER JOIN estado e ON u.id_estado=e.id INNER JOIN municipio m ON u.id_municipio=m.id', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
const todosActivos = (request, response) => {
    connection_1.pool.query('SELECT * FROM usuario u INNER JOIN pais p ON u.id_pais=p.id INNER JOIN estado e ON u.id_estado=e.id INNER JOIN municipio m ON u.id_municipio=m.id WHERE activo=1 AND eliminado=0', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
const todosInActivos = (request, response) => {
    connection_1.pool.query('SELECT * FROM usuario u INNER JOIN pais p ON u.id_pais=p.id INNER JOIN estado e ON u.id_estado=e.id INNER JOIN municipio m ON u.id_municipio=m.id WHERE activo=0 AND eliminado=0', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
const todosEliminados = (request, response) => {
    connection_1.pool.query('SELECT * FROM usuario u INNER JOIN pais p ON u.id_pais=p.id INNER JOIN estado e ON u.id_estado=e.id INNER JOIN municipio m ON u.id_municipio=m.id WHERE eliminado=1', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
const porId = (request, response) => {
    const id = parseInt(request.params.id);
    connection_1.pool.query('SELECT * FROM usuario WHERE id=$1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
const porLider = (request, response) => {
    const id = parseInt(request.params.id);
    connection_1.pool.query('SELECT * FROM usuario WHERE id_lider=$1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
const porNombre = (request, response) => {
    const nombre = request.params.nombre;
    connection_1.pool.query('SELECT * FROM usuario u INNER JOIN pais p ON u.id_pais=p.id INNER JOIN estado e ON u.id_estado=e.id INNER JOIN municipio m ON u.id_municipio=m.id WHERE nombre=$1', [nombre], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
const porRol = (request, response) => {
    const rol = request.params.rol;
    connection_1.pool.query('SELECT * FROM usuario u INNER JOIN pais p ON u.id_pais=p.id INNER JOIN estado e ON u.id_estado=e.id INNER JOIN municipio m ON u.id_municipio=m.id WHERE rol=$1', [rol], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
const porNombreYRol = (request, response) => {
    const nombre = request.params.nombre;
    const rol = request.params.rol;
    connection_1.pool.query('SELECT * FROM usuario u INNER JOIN pais p ON u.id_pais=p.id INNER JOIN estado e ON u.id_estado=e.id INNER JOIN municipio m ON u.id_municipio=m.id WHERE nombre=$1 AND rol=$2 AND ', [nombre, rol], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
const editar = (request, response) => {
    const id = parseInt(request.params.id);
    const { img_perfil, nombre, ape_pat, ape_mat, correo, contrasena, id_pais, id_estado, id_municipio, direccion, telefono, rol, id_lider, activo } = request.body;
    if (img_perfil && nombre && ape_pat && ape_mat && correo && contrasena && id_pais && id_estado && id_municipio && direccion && telefono && rol && id_lider && activo) {
        connection_1.pool.query('UPDATE usuario SET img_perfil=$1, nombre=$2, ape_pat=$3, ape_mat=$4, correo=$5, contrasena=$6, id_pais=$7, id_estado=$8, id_municipio=$9, direccion=$10, telefono=$11, rol=$12, id_lider=$13, activo=$14 WHERE id=$15', [img_perfil, nombre, ape_pat, ape_mat, correo, contrasena, id_pais, id_estado, id_municipio, direccion, telefono, rol, id_lider, activo, id], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json("Usuario Actualizado");
        });
    }
    else {
        response.status(200).json("Se requiere img_perfil, nombre, ape_pat, ape_mat, correo, contrasena, id_pais, id_estado, id_municipio, direccion, telefono, rol, id_lider, activo");
    }
};
const eliminar = (request, response) => {
    const id = parseInt(request.params.id);
    connection_1.pool.query('UPDATE usuario SET activo=0, eliminado=1 WHERE id=$1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json("Se Elimino el Usuario Correctamente");
    });
};
module.exports = {
    todos,
    todosActivos,
    todosInActivos,
    todosEliminados,
    porId,
    porLider,
    porNombre,
    porRol,
    porNombreYRol,
    editar,
    eliminar
};
