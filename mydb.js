const hostName = "localhost";
const port = 3306;
const user = "root";
const password = "root";
const database = "tracker";

// create the connection information for the sql database
module.exports.generateConnection = function () {
    var mysql = require("mysql");
    var connection = mysql.createConnection({
        host: hostName,
        user: user,
        port: port,
        password: password,
        database: database
    });
    return connection;
}