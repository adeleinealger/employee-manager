import inquirer from "inquirer";
import DB from './DB.js';

// define the cli class
class Cli {
    static start() {
        inquirer.prompt(
            [{
                type: 'list',
                name: 'selectAction',
                message: 'What would you like to do?',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department',
                    'Add a role', 'Add an employee', 'Update an employee role']
            }]
        )
            .then(answers => {
                console.log(answers);
                DB.test();
            })
    }
}

// export the cli class
export default Cli;
