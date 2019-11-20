"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pool = require('pg').Pool;
exports.pool = new Pool({
    user: 'admin',
    password: 'root',
    host: '192.168.0.17',
    database: 'autobuses',
    port: 5432,
});
// export const pool = new Pool({
//     user: 'zmkoavjirqmpqp',
//     password: 'bc5da29f9f22138bb2aee612df66cfcff1b1513c1c54a28d14e3a834b1ada157',
//     host: 'ec2-174-129-253-146.compute-1.amazonaws.com',
//     database: 'dmsdoffu6u73v',
//     port: 5432,
// });
