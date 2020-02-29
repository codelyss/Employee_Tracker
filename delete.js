const mydb = require('./mydb.js');

module.exports.deleteDepartment = function (deptId, callBack) {
    deleteData("department", deptId, `Successfully deleted department.`, callBack);
}

module.exports.deleteRole = function (roleId, callBack) {
    deleteData("role", roleId, `Successfully deleted role.`, callBack);
}

module.exports.deleteEmployee = function (empId, callBack) {
    deleteData("employee", empId, `Successfully deleted employee.`, callBack);
}

function deleteData(tableName, id, message, callBack) {
    let connection = mydb.generateConnection();
    let query = `DELETE FROM ${tableName} WHERE id = ${id} `;
    connection.query(query, function (err, result) {
        connection.end();
        callBack(err != null ? err : message);
    });
}