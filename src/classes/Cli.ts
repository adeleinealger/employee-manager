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
                    console.table(await DB.viewRoles());
                    Cli.start();
                } else if (answers.selectAction === 'View all employees') {
                    console.table(await DB.viewEmployees());
                    Cli.start();
                } else if (answers.selectAction === 'Add a department') {
                    inquirer.prompt(
                        [{
                            type: 'input',
                            name: 'departmentName',
                            message: 'What is the name of the department?'
                        }]
                    )
                        .then(async (answers) => {
                            await DB.createDepartment(answers.departmentName);
                            console.log(`Department ${answers.departmentName} created.`);
                            Cli.start();
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
                            const roleName = answers.roleName;
                            inquirer.prompt(
                                [{
                                    type: 'input',
                                    name: 'roleSalary',
                                    message: 'What is the salary of the role?'
                                }]
                            )
                                .then(answers => {
                                    const roleSalary = answers.roleSalary;
                                    inquirer.prompt(
                                        [{
                                            type: 'input',
                                            name: 'roleDepartmentId',
                                            message: 'What is the department id of the role?'
                                        }]
                                    )
                                        .then(async (answers) => {
                                            const roleDepartmentId = answers.roleDepartmentId;
                                            await DB.createRole(roleName, roleSalary, roleDepartmentId);
                                            console.log(`Role ${roleName} created.`);
                                            Cli.start();
                                        })
                                }
                                )
                        })
                } else if (answers.selectAction === 'Add an employee') {
                    const employees = await DB.viewEmployeeNames();
                    const roles = await DB.viewRoleNames();

                    inquirer.prompt(
                        [{
                            type: 'input',
                            name: 'employeeFirstName',
                            message: 'What is the first name of this employee?'
                        }]
                    )
                        .then(answers => {
                            const employeeFirstName = answers.employeeFirstName;
                            inquirer.prompt(
                                [{
                                    type: 'input',
                                    name: 'employeeLastName',
                                    message: 'What is the last name of this employee?'
                                }]
                            )
                                .then(answers => {
                                    const employeeLastName = answers.employeeLastName;
                                    if (Array.isArray(roles)) {
                                        inquirer.prompt(
                                            [{
                                                type: 'list',
                                                name: 'employeeRoleId',
                                                message: 'What is the role of this employee?',
                                                choices: [...roles]
                                            }]
                                        )
                                        .then(answers => {
                                            const employeeRoleId = answers.employeeRoleId.split(':')[0];
                                            if (Array.isArray(employees)) {
                                            inquirer.prompt(
                                                [{
                                                    type: 'list',
                                                    name: 'employeeManagerId',
                                                    message: 'Who is the manager of this employee?',
                                                    choices: [...employees]
                                                }]
                                            )
                                                .then(async (answers) => {
                                                    const employeeManagerId = answers.employeeManagerId.split(':')[0];
                                                    await DB.createEmployee(employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId);
                                                    console.log(`Employee ${employeeFirstName} ${employeeLastName} created.`);
                                                    Cli.start();
                                                })
                                        }})
                                }
                            })
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
                        )
                        .then(answers => {
                            const employeeId = answers.employeeName.split(':')[0];
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
                                const roleId = answers.roleName.split(':')[0];
                                DB.updateEmployeeRole(employeeId, roleId);
                                console.log(`Employee ${employeeId} updated to role ${roleId}.`);
                                Cli.start();
                            })
                        }
                        });
                }
                } else if (answers.selectAction === 'Exit') {
                    process.exit();
                }
            })
    }
}

// export the cli class
export default Cli;
