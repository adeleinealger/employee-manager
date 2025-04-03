import inquirer from "inquirer";
import DB from './DB.js';

// define the cli class
class Cli {
    static async start() {
        inquirer.prompt(
            [{
                type: 'list',
                name: 'selectAction',
                message: 'What would you like to do?',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department',
                    'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
            }]
        )
            .then(async (answers) => {
                // when the user selects an action, call the appropriate function
                if (answers.selectAction === 'View all departments') {
                    console.table(await DB.viewDepartments());
                    Cli.start();
                } else if (answers.selectAction === 'View all roles') {
                    await DB.viewRoles();
                } else if (answers.selectAction === 'View all employees') {
                    // TODO: implement viewEmployees method
                    // DB.viewEmployees();
                } else if (answers.selectAction === 'Add a department') {
                    inquirer.prompt(
                        [{
                            type: 'input',
                            name: 'departmentName',
                            message: 'What is the name of the department?'
                        }]
                    )
                        .then(answers => {
                            // TODO implement createDepartment method
                            // DB.createDepartment(answers.departmentName);
                        }
                        )
                } else if (answers.selectAction === 'Add a role') {
                    inquirer.prompt(
                        [{
                            type: 'input',
                            name: 'roleName',
                            message: 'What is the name of the role?'
                        }]
                    )
                        .then(answers => {
                            // TODO implement createRole method
                            // DB.createRole(answers.roleName);
                        }
                        )
                } else if (answers.selectAction === 'Add an employee') {
                    inquirer.prompt(
                        [{
                            type: 'input',
                            name: 'employeeName',
                            message: 'What is the name of the employee?'
                        }]
                    )
                        .then(answers => {
                            // TODO implement createEmployee method
                            // DB.createEmployee(answers.employeeName);
                        }
                        )
                } else if (answers.selectAction === 'Update an employee role') {
                    const employees = await DB.viewEmployeeNames();
                    const roles = await DB.viewRoleNames();
                    if (Array.isArray(employees)) {
                        await inquirer.prompt(
                            [{
                                type: 'list',
                                name: 'employeeName',
                                message: 'Which employee would you like to update?',
                                choices: [...employees]
                            }]
                        );
                    if (Array.isArray(roles)) {
                        inquirer.prompt(
                            [{
                                type: 'list',
                                name: 'roleName',
                                message: 'What is the new role of the employee?',
                                choices: [...roles]
                            }]
                        )
                        .then(answers => {
                            // TODO implement updateEmployeeRole method
                            // DB.updateEmployeeRole(answers.employeeName, answers.roleName);
                        }
                        )
                    } else {
                        console.error("Error: Expected an array of employees but received:", employees);
                    }
                }
                }
            })
    }
}

// export the cli class
export default Cli;
