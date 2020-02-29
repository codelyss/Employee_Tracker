const mydb = require("./mydb.js");

module.exports.updateDepartmentName = function (deptId, newName, callBack) {
    let checkConnection = mydb.generateConnection();
    let checkExists = `SELECT id FROM department WHERE name = ? `;
    checkConnection.query(checkExists, [newName], function (errCheck, checkResult) {
        checkConnection.end();
        if (checkResult.length > 0) {
            callBack("Department with that name already exists.");
            return;
        }

        let query = `UPDATE department SET name = ? WHERE id = ? `;
        let connection = mydb.generateConnection()
        connection.query(query, [newName, deptId], function (err, result) {
            connection.end();
            callBack(err != null ? err : `Successfully changed department's name to ${newName}.`);
        });
    });
}


module.exports.updateRole = function (roleId, newRoleName, salary, deptId, callBack) {
    let checkConnection = mydb.generateConnection();
    let checkExists = `SELECT id FROM role WHERE title = ? `;
    checkConnection.query(checkExists, [newRoleName], function (errCheck, checkResult) {
        checkConnection.end();
        if (checkResult.length > 0) {
            callBack("Role with that name already exists.");
            return;
        }

        let query = `UPDATE role SET title = ?, salary = ?, department_id = ? WHERE id = ? `;
        let connection = mydb.generateConnection();
        connection.query(query, [newRoleName, salary, deptId, roleId], function (err, result) {
            connection.end();
            callBack(err != null ? err : `Successfully changed role to ${newRoleName} with salary of ${salary}`);
        });
    });
}

module.exports.updateEmployee = function (empId, newFirstName, newLastName, newRoleId, newManagerId, callBack) {
    let connection = mydb.generateConnection();
    let query = `UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ? `
    connection.query(query, [newFirstName, newLastName, newRoleId, newManagerId, empId], function (err, result) {
        connection.end();
        callBack(err != null ? err : `Successfully updated employee.`);
    });
}