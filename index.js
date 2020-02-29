const inquirer = require("inquirer");

const display = require("./display.js");
const updates = require("./updates.js");
const prompts = require("./prompts.js");
const dbchoices = require("./choices.js");
const addnew = require("./addnew.js");
const deletes = require("./delete.js");

function mainPrompt() {
    let options = ["View", "Add", "Update", "Delete", "Other"];
    let question = prompts.generateListPrompt("What would you like to do?", "action", options)
    inquirer.prompt(
        [question]
    ).then(results => {
        switch (results.action) {
            case 'Add':
                addPrompt();
                break;
            case 'View':
                viewPrompt();
                break;
            case 'Update':
                updatePrompt();
                break;
            case 'Delete':
                deletePrompt();
                break;
            case 'Other':
                otherPrompt();
                break;
        }
    });
}

// Add prompts
function addPrompt() {
    let options = ["Departments", "Roles", "Employees"];
    let question = prompts.generateListPrompt("What would you like to add?", "tablename", options);
    inquirer.prompt(
        [question]
    ).then(results => {
        let tableName = results.tablename;
        switch (tableName) {
            case "Departments":
                addNewDepartmentPrompt();
                break;
            case "Roles":
                addNewRolePrompt();
                break;
            case "Employees":
                addNewEmployeePrompt();
                break;
        }
    });
}

function addNewDepartmentPrompt() {
    let question = prompts.generateInputPrompt("What's the name of the department you want to add?", "deptname", null);
    inquirer.prompt(
        [question]
    ).then(results => {
        let deptName = results.deptname;
        addnew.insertNewDepartment(deptName, function (message) {
            console.log(message);
        });
    });
}

function addNewRolePrompt() {
    dbchoices.getDepartmentChoices(function (result) {
        let deptChoices = result;
        let question1 = prompts.generateInputPrompt("What's the name of the role you want to add?", "rolename", null);
        let question2 = prompts.generateNumberPrompt("What should the salary be set to?", "salary", salaryOk);
        let question3 = prompts.generateListPrompt("Which department does this role belong to?", "roledept", deptChoices)
        inquirer.prompt(
            [question1, question2, question3]
        ).then(results => {
            let roleName = results.rolename;
            let salary = results.salary;
            let dept = results.roledept;
            addnew.insertNewRole(roleName, salary, dept, function (message) {
                console.log(message);
            });
        });
    });
}

function salaryOk(salary) {
    return salary >= 0 ? true : "Salary can't be a negative number.";
}

function addNewEmployeePrompt() {
    dbchoices.getRoleChoices(function (roleChoicesResult) {
        let roleChoices = roleChoicesResult;
        dbchoices.getEmployeeChoices(function (empChoiceResults) {
            let empChoices = empChoiceResults;
            let question1 = prompts.generateInputPrompt("What is the employee's first name?", "firstname", null);
            let question2 = prompts.generateInputPrompt("What is the employee's last name?", "lastname", null);
            let question3 = prompts.generateListPrompt("Which role does this employee belong to?", "emprole", roleChoices);
            let question4 = prompts.generateListPrompt("Who is this employee's manager?", "empmanager", empChoices);

            inquirer.prompt(
                [question1, question2, question3, question4]
            ).then(results => {
                let firstName = results.firstname;
                let lastName = results.lastname;
                let role = results.emprole;
                let manager = results.empmanager;
                addnew.insertNewEmployee(firstName, lastName, role, manager, function (message) {
                    console.log(message);
                });
            });
        });
    });
}
// End of add prompts


// View prompts
function viewPrompt() {
    let options = ["Departments", "Roles", "Employees"];
    let question1 = prompts.generateListPrompt("What would you like to view?", "tablename", options);
    inquirer.prompt(
        [question1]
    ).then(results => {
        let tableName = results.tablename;
        switch (tableName) {
            case "Departments":
                display.displayDepartments();
                break;
            case "Roles":
                display.displayRoles();
                break;
            case "Employees":
                viewEmployeePrompt();
                break;
        }
    });
}

function viewEmployeePrompt() {
    let options = ["All Employees", "Filter by Role", "Filter by Manager"];
    let question1 = prompts.generateListPrompt("Which employees would you like to view?", "empview", options)
    inquirer.prompt(
        [question1]
    ).then(results => {
        let filterChoice = results.empview;
        switch (filterChoice) {
            case "All Employees":
                display.displayAllEmployees();
                break;
            case "Filter by Role":
                viewEmployeeRolePrompt();
                break;
            case "Filter by Manager":
                viewEmployeeManagerPrompt();
                break;
        }
    });
}

function viewEmployeeRolePrompt() {
    dbchoices.getRoleChoices(function (result) {
        let roleChoices = result;
        let question1 = prompts.generateListPrompt("Display all employees that are:", "roleid", roleChoices);
        inquirer.prompt(
            [question1]
        ).then(results => {
            display.displayEmployeesByRole(results.roleid);
        });
    });
}

function viewEmployeeManagerPrompt() {
    dbchoices.getManagerChoices(function (result) {
        let managerChoices = result;
        let question1 = prompts.generateListPrompt("Display all employees whose manager is:", "managerid", managerChoices);
        inquirer.prompt(
            [question1]
        ).then(results => {
            display.displayEmployeesByManager(results.managerid);
        });
    });
}
// End of view prompts


// Update prompts
function updatePrompt() {
    let options = ["Departments", "Roles", "Employees"];
    let question1 = prompts.generateListPrompt("What would you like to update?", "tablename", options);
    inquirer.prompt(
        [question1]
    ).then(results => {
        let tableName = results.tablename;
        switch (tableName) {
            case "Departments":
                updateDepartmentsPrompt();
                break;
            case "Roles":
                updateRolesPrompt();
                break;
            case "Employees":
                updateEmployeesPrompt();
                break;
        }
    });
}

function updateDepartmentsPrompt() {
    dbchoices.getDepartmentChoices(function (result) {
        let deptChoices = result;
        let question1 = prompts.generateListPrompt("Which department would you like to update?", "deptid", deptChoices);
        inquirer.prompt(
            [question1]
        ).then(results => {
            updateDepartmentNamePrompt(results.deptid);
        });
    });
}

function updateDepartmentNamePrompt(deptid) {
    let question1 = prompts.generateInputPrompt("What would you like to be the new name for this department?", "deptname", null)
    inquirer.prompt(
        [question1]
    ).then(results => {
        updates.updateDepartmentName(deptid, results.deptname, function (message) {
            console.log(message);
        });
    });
}

function updateRolesPrompt() {
    dbchoices.getRoleChoicesDetails(function (result) {
        let roleChoices = result;
        let question1 = prompts.generateListPrompt("Which role would you like to update?", "roleid", roleChoices);
        inquirer.prompt(
            [question1]
        ).then(results => {
            updateRoleNamePrompt(results.roleid);
        });
    });
}

function updateRoleNamePrompt(roleId) {
    dbchoices.getDepartmentChoices(function (result) {
        let departmentChoices = result;
        let question1 = prompts.generateInputPrompt("What should be the new name for this role?", "newrolename", null);
        let question2 = prompts.generateNumberPrompt("What should be the new salary?", "newsalary", salaryOk);
        let question3 = prompts.generateListPrompt("What should be the department attached to this role?", "newdepartment", departmentChoices);
        inquirer.prompt(
            [question1, question2, question3]
        ).then(results => {
            var newRoleName = results.newrolename;
            var salary = results.newsalary;
            var deptId = results.newdepartment;
            updates.updateRole(roleId, newRoleName, salary, deptId, function (message) {
                console.log(message);
            });
        });
    });
}

function updateEmployeesPrompt() {
    dbchoices.getEmployeeChoicesDetails(function (result) {
        let employeeChoices = result;
        let question1 = prompts.generateListPrompt("Which employee would you like to update?", "empid", employeeChoices);
        inquirer.prompt(
            [question1]
        ).then(results => {
            updateEmployeePrompt(results.empid);
        });
    });
}

function updateEmployeePrompt(empId) {
    dbchoices.getRoleChoices(function (roleResult) {
        let roleChoices = roleResult;
        dbchoices.getEmployeeChoices(function (empsResult) {
            let empChoices = empsResult;
            let question1 = prompts.generateInputPrompt("What should be the new first name?", "newfirstname", null);
            let question2 = prompts.generateInputPrompt("What should be the new last name?", "newlastname", null);
            let question3 = prompts.generateListPrompt("What should be this employee's new role?", "newrole", roleChoices);
            let question4 = prompts.generateListPrompt("What should be this employee's manager?", "newmanager", empChoices);
            inquirer.prompt(
                [question1, question2, question3, question4]
            ).then(results => {
                var newFirstName = results.newfirstname;
                var newLastName = results.newlastname;
                var newRoleId = results.newrole;
                var newManagerId = results.newmanager;
                updates.updateEmployee(empId, newFirstName, newLastName, newRoleId, newManagerId, function (message) {
                    console.log(message);
                });
            });
        });
    });
}
// End of update prompts


// Delete prompts
function deletePrompt() {
    let options = ["Departments", "Roles", "Employees"];
    let question1 = prompts.generateListPrompt("What would you like to delete?", "tablename", options);
    inquirer.prompt(
        [question1]
    ).then(results => {
        let tableName = results.tablename;
        switch (tableName) {
            case "Departments":
                deleteDepartmentPrompt();
                break;
            case "Roles":
                deleteRolePrompt();
                break;
            case "Employees":
                deleteEmployeePrompt();
                break;
        }
    });
}

function deleteDepartmentPrompt() {
    dbchoices.getDepartmentChoices(function (result) {
        let deptChoices = result;
        let question1 = prompts.generateListPrompt("Which department would you like to delete?", "deptid", deptChoices);
        let question2 = prompts.generateConfirmPrompt("Are you sure you want to delete this department?", "deletedept");
        inquirer.prompt(
            [question1, question2]
        ).then(results => {
            let deptId = results.deptid;
            let toDelete = results.deletedept;
            if (!toDelete) { return; }
            deletes.deleteDepartment(deptId, function (message) {
                console.log(message);
            });
        });
    });
}

function deleteRolePrompt() {
    dbchoices.getRoleChoices(function (result) {
        let roleChoices = result;
        let question1 = prompts.generateListPrompt("Which role would you like to delete?", "roleid", roleChoices);
        let question2 = prompts.generateConfirmPrompt("Are you sure you want to delete this role?", "deleterole");
        inquirer.prompt(
            [question1, question2]
        ).then(results => {
            let roleId = results.roleid;
            let toDelete = results.deleterole;
            if (!toDelete) { return; }
            deletes.deleteRole(roleId, function (message) {
                console.log(message);
            });
        });
    });
}

function deleteEmployeePrompt() {
    dbchoices.getEmployeeChoices(function (result) {
        let empChoices = result;
        let question1 = prompts.generateListPrompt("Which employee would you like to delete?", "empid", empChoices);
        let question2 = prompts.generateConfirmPrompt("Are you sure you want to delete this employee?", "deleteemp");
        inquirer.prompt(
            [question1, question2]
        ).then(results => {
            let empId = results.empid;
            let toDelete = results.deleteemp;
            if (!toDelete) { return; }
            deletes.deleteEmployee(empId, function (message) {
                console.log(message);
            });
        });
    });
}
// End of delete prompts




mainPrompt();