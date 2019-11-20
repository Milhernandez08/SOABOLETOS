const INSERTAR = "INSERT INTO boletos("+
    "nombre_cliente, correo_cliente, metodo_pago, tipo_boleto, "+
    "fecha_salida, fecha_regreso, num_aciento_cliente, costo, autobus_id) "+
    "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
    
const ACTUALIZAR = "UPDATE boletos SET "+
    "nombre_cliente=$2, correo_cliente=$3, metodo_pago=$4, tipo_boleto=$5,"+
    " fecha_salida=$6, fecha_regreso=$7, num_aciento_cliente=$8, costo=$9, autobus_id=$10"+
    " WHERE id=$1"; //" WHERE <condition>"

const SELECTEMAIL = "SELECT * FROM boletos INNER JOIN"+ 
    " autobuses a ON autobus_id = a.id WHERE correo_cliente=$1";

const SELECTACIENTO = "SELECT * FROM boletos INNER JOIN"+ 
    " autobuses a ON autobus_id = a.id WHERE num_aciento_cliente=$1";

const SELECTID = "SELECT * FROM boletos INNER JOIN"+
    " autobuses a ON autobus_id = a.id WHERE boletos.id=$1"

const SELECTALL = "SELECT * FROM boletos INNER JOIN"+
    " autobuses a ON autobus_id = a.id"

const ELIMINAR = "SELECT * FROM boletos"+
    " WHERE id=$1";

const DESCUENTO = "SELECT tipo_bus, num_acientos_disponibles, num_acientos_ocupados FROM autobuses WHERE id=$1";

const UPDATEASIENTOS = "UPDATE autobuses SET "+
    "num_acientos_disponibles=$1, num_acientos_ocupados=$2"+
    " WHERE id=$3";

module.exports = {
    INSERTAR,
    ACTUALIZAR,
    SELECTEMAIL,
    SELECTACIENTO,
    SELECTID,
    SELECTALL,
    ELIMINAR,
    DESCUENTO,
    UPDATEASIENTOS
}