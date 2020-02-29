const inquirer = require("inquirer");

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

mainPrompt();