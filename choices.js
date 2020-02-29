const mydb = require('./mydb.js');

function getChoices(sqlQuery, functionObject, callBack) {
    let connection = mydb.generateConnection();
    let query = sqlQuery;
    connection.query(query, function (err, result) {
        connection.end();
        let arrResult = [];
        for (let i = 0; i < result.length; i++) {
            let d = functionObject(result[i]);
            arrResult.push(d);
        }
        callBack(arrResult);
    });
}

function generateDepartmentObject(dept) {
    let deptObj = {
        name: dept.name,
        value: dept.id
    };
    return deptObj;
}

function generateRoleObject(role) {
    let roleObj = {
        name: role.title,
        value: role.id
    };
    return roleObj;
}

function generateRoleDetailObject(role) {
    let roleObj = {
        name: `${role.title} (${role.salary})`,
        value: role.id
    };
    return roleObj;
}

function generateEmployeeObject(emp) {
    let empObj = {
        name: `${emp.FirstName} ${emp.LastName}`,
        value: emp.id
    };
    return empObj;
}

function generateEmployeeDetailsObject(emp) {
    let empObj = {
        name: `${emp.FirstName} ${emp.LastName} (${emp.Role})`,
        value: emp.id
    };
    return empObj;
}

module.exports.getDepartmentChoices = function (callBack) {
    let sqlquery = "SELECT id, name FROM department ";
    getChoices(sqlquery, generateDepartmentObject, callBack);
}

module.exports.getRoleChoices = function (callBack) {
    let sqlquery = "SELECT id, title FROM role ";
    getChoices(sqlquery, generateRoleObject, callBack);
}

module.exports.getRoleChoicesDetails = function (callBack) {
    let sqlquery = "SELECT id, title, FORMAT(salary, 'C', 'en-us') AS 'salary' FROM role ";
    getChoices(sqlquery, generateRoleDetailObject, callBack);
}

module.exports.getManagerChoices = function (callBack) {
    let sqlquery = "SELECT id, first_name AS 'FirstName', last_name AS 'LastName' FROM employee WHERE id IN (SELECT DISTINCT manager_id FROM employee WHERE manager_id IS NOT NULL) ";
    getChoices(sqlquery, generateEmployeeObject, callBack);
}

module.exports.getEmployeeChoices = function (callBack) {
    let sqlquery = "SELECT id, first_name AS 'FirstName', last_name AS 'LastName' FROM employee ORDER BY LastName, FirstName ";
    getChoices(sqlquery, generateEmployeeObject, callBack);
}

module.exports.getEmployeeChoicesDetails = function (callBack) {
    let sqlquery = "SELECT employee.id, first_name AS 'FirstName', last_name AS 'LastName', role.title AS 'Role' FROM employee INNER JOIN role ON employee.role_id = role.id ";
    getChoices(sqlquery, generateEmployeeDetailsObject, callBack);
}