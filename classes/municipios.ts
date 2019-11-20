import { pool } from "./connection";

const todos = (request, response) => {
    const id_estado = parseInt(request.params.id_estado);

    pool.query('SELECT * FROM municipio WHERE id_estado=$1', [id_estado],
    (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const porId = (request, response) => {
    const id = parseInt(request.params.id);
    
    pool.query('SELECT * FROM municipio WHERE id=$1', [id], (error, results) => {
        if (error){
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

module.exports = {
    todos,
    porId
}