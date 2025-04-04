import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: process.env.DB_NAME,
    port: 5432,
});

export default class DB {
  // define method to connect to the database
    static async connectToDb(): Promise<void> {
        try {
          await pool.connect();
        } catch (err) {
          console.error('Error connecting to database:', err);
          process.exit(1);
        }
    }
    // define generic private method to query the database
      static async queryDb(query: string): Promise<any> {
        try {
            this.connectToDb();
            const res = await pool.query(query);
            return res.rows;
        } catch (err) {
            console.error('Error querying database:', err);
            throw err;
        }
    }
    // define method to view all departments
    static async viewDepartments(): Promise<void> {
        try {
            const departments = await this.queryDb('SELECT * FROM department');
            return departments;
        } catch (err) {
            console.error('Error viewing departments:', err);
        }
    }
    // define method to view all roles
    static async viewRoles(): Promise<void> {
      try {
          const roles = await this.queryDb('SELECT * FROM role');
          return roles;
      } catch (err) {
          console.error('Error viewing roles:', err);
      }
    }
    static async viewEmployees(): Promise<void> {
        try {
            const employees = await this.queryDb('SELECT * FROM employee');
            return employees;
        } catch (err) {
            console.error('Error viewing employees:', err);
        }
    }
    static async viewEmployeeNames(): Promise<void> {
        try {
            const employeeNames = await this.queryDb('SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee inner join role on employee.role_id = role.id');
            // map the employee names to an array
            const employeeNamesArray = employeeNames.map(
                (employee: { id: number; first_name: string; last_name: string; title: string }) => {
                    return `${employee.id}: ${employee.first_name} ${employee.last_name} (${employee.title})`;
            }
            );
            return employeeNamesArray;
        } catch (err) {
            console.error('Error viewing employee names:', err);
        }
      }
    static async viewRoleNames(): Promise<void> {
        try {
            const roleNames = await this.queryDb('SELECT * FROM role');
            // map the role names to an array
            const roleNamesArray = roleNames.map(
                (role: { id: number; title: string }) => {
                    return `${role.id}: ${role.title}`;
                }
            );
            return roleNamesArray;
        }
          catch (err) {
            console.error('Error viewing role names:', err);
        }
    }
      
    // define method to create a department
    // static async createDepartment(name: string): Promise<void> {
    //     try {
    //         await this.queryDb(`INSERT INTO department (name) VALUES ('${name}')`);
    //         console.log(`Department ${name} created.`);
    //     } catch (err) {
    //         console.error('Error creating department:', err);
    //     }
    // }
}