import { pool } from "./connection";

//id_user, id_lote, nombre, latitud, longitud, eliminado

const crear = (request, response) => {
    const { id_user, id_lote, nombre, latitud, longitud, eliminado } = request.body;

    if (id_user && id_lote && nombre && latitud && longitud && eliminado) {
        pool.query('INSERT INTO localizacion(id_user, id_lote, nombre, latitud, longitud, eliminado) VALUES($1, $2, $3, $4, $5, $6)',
        [id_user, id_lote, nombre, latitud, longitud, eliminado], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json("lote Creado con Exito");
        });
    }
    else {
        response.status(200).json("se requiere id_user, id_lote, nombre, latitud, longitud, eliminado");
    }
}

const todos = (request, response) => {
    pool.query('SELECT * FROM localizacion l INNER JOIN usuario u ON l.id_user=u.id INNER JOIN lote lo ON l.id_lote=lo.id WHERE eliminado=0', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const porId = (request, response) => {
    const id = parseInt(request.params.id);
    
    pool.query('SELECT * FROM localizacion  l INNER JOIN usuario u ON l.id_user=u.id INNER JOIN lote lo ON l.id_lote=lo.id WHERE id=$1', [id], (error, results) => {
        if (error){
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const editar = (request, response) => {
    const id = parseInt(request.params.id);
    const { id_user, id_lote, nombre, latitud, longitud } = request.body;

    if (id_user && id_lote && nombre && latitud && longitud ) {
        pool.query('UPDATE localizacion SET id_user=$1, id_lote=$2, nombre=$3, latitud=$4, longitud=$5 WHERE id=$6',
        [id_user, id_lote, nombre, latitud, longitud, id], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json("Usuario Actualizado")
        });
    }
    else {
        response.status(200).json("Se requiere id_user, id_lote, nombre, latitud, longitud")
    }
}

const eliminar = (request, response) => {
    const id = parseInt(request.params.id);

    if (id) {
        pool.query('UPDATE localizacion SET eliminado=1 WHERE id=$1',
        [id], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json("Se elimino correctamente")
        });
    }
    else {
        response.status(200).json("Error al eliminar")
    }
}

module.exports = {
    crear,
    todos,
    porId,
    editar,
    eliminar
}
