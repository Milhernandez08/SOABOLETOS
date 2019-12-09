const Pool = require('pg').Pool

// export const pool = new Pool({
//     user: 'admin',
//     password: 'root',
//     host: '192.168.0.17',
//     database: 'autobuses',
//     port: 5432,
// });

export const pool = new Pool({
    user: 'postgres',
    password: 'MiltonHernandez08.',
    host: 'boletosdb.cwpktqj9jiw2.us-east-1.rds.amazonaws.com',
    database: 'boletos',
    port: 5432,
});