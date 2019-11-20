"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cargarArchivo = require('express-fileupload');
exports.app = express();
exports.app.use(cargarArchivo());
