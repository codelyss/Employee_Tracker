const mydb = require("./mydb.js");
const tables = require("console.table");

function displayTable(err, results) {
    err != null ? console.log(err) : console.table(results);
}

function displayData(sqlquery) {
    let connection = mydb.generateConnection();
    connection.query(sqlquery, displayTable);
    connection.end();
}

module.exports.displayDepartments = function () {
    displayData("SELECT name FROM department ");
}

module.exports.displayRoles = function () {
    displayData("SELECT title AS 'Role Title', FORMAT(salary, 'C', 'en-us') AS 'Salary', department.name AS 'Department Name' FROM role INNER JOIN department ON department.id = role.department_id ");
}

module.exports.displayAllEmployees = function () {
    displayData("SELECT first_name AS 'First Name', last_name AS 'Last Name', role.title AS 'Role' FROM employee INNER JOIN role ON employee.role_id = role.id ");
}

module.exports.displayEmployeesByRole = function(roleId) {
    displayData(`SELECT first_name AS 'First Name', last_name AS 'Last Name', role.title AS 'Role' FROM employee INNER JOIN role ON employee.role_id = role.id WHERE role_id = ${roleId}`);
}

module.exports.displayEmployeesByManager = function(managerId) {
    displayData(`SELECT first_name AS 'First Name', last_name AS 'Last Name' FROM employee WHERE manager_id = ${managerId}`);
}

module.exports.displayDepartmentBudget = function (deptId) {
    displayData(`SELECT FORMAT(SUM(role.salary), 'C', 'en-us') AS 'Total' FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.id = ${deptId} `);
}