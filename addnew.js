const mydb = require('./mydb.js');

module.exports.insertNewDepartment = function (deptName, callBack) {
    if (isEmptyOrSpaces(deptName)) { callBack("Department name can't be blank."); return; }
    let checkConnection = mydb.generateConnection();
    let checkQuery = `SELECT id FROM department WHERE name = ? `;
    checkConnection.query(checkQuery, [deptName], function (checkErr, checkResults) {
        checkConnection.end();
        if (checkResults.length > 0) {
            callBack("Department with that name already exists.");
            return;
        }

        let connection = mydb.generateConnection();
        let query = `INSERT INTO department (name) VALUES (?) `;
        connection.query(query, [deptName], function (err, result) {
            connection.end();
            callBack(err != null ? err : `Successfully added ${deptName} to departments.`);
        });
    });
}

module.exports.insertNewRole = function (roleName, salary, deptId, callBack) {
    if (isEmptyOrSpaces(roleName)) { callBack("Role name can't be blank."); return; }
    let checkConnection = mydb.generateConnection();
    let checkQuery = `SELECT id FROM role WHERE title = ? `;
    checkConnection.query(checkQuery, [roleName], function (checkErr, checkResults) {
        checkConnection.end();
        if (checkResults.length > 0) {
            callBack("Role with that name already exists.");
            return;
        }

        let connection = mydb.generateConnection();
        let query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?) `;
        connection.query(query, [roleName, salary, deptId], function (err, results) {
            connection.end();
            callBack(err != null ? err : `Successfully added ${roleName} with a salary of ${salary}.`);
        });
    });
}

module.exports.insertNewEmployee = function (firstName, lastName, roleId, managerId, callBack) {
    if (isEmptyOrSpaces(firstName)) { callBack("First name can't be blank."); return; }
    if (isEmptyOrSpaces(lastName)) { callBack("Last name can't be blank."); return; }
    let connection = mydb.generateConnection();
    let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?) `;
    connection.query(query, [firstName, lastName, roleId, managerId], function (err, result) {
        connection.end();
        callBack(err != null ? err : `Successfully added ${firstName} ${lastName}.`);
    });
}
