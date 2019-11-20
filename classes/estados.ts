import { pool } from "./connection";

const todos = (request, response) => {
    const id_pais = parseInt(request.params.id_pais);

    pool.query('SELECT * FROM estado WHERE id_pais=$1', [id_pais], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const porId = (request, response) => {
    const id = parseInt(request.params.id);
    
    pool.query('SELECT * FROM estado WHERE id=$1', [id], (error, results) => {
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