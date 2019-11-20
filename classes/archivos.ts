const express = require('express');
const cargarArchivo = require('express-fileupload');

export const app = express()

app.use(cargarArchivo());