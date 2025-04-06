INSERT INTO
    department (name) VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Marketing');

INSERT INTO
    role (title, salary, department_id) VALUES
    ('Sales Lead', 100000, 1),
    ('Sales Associate', 50000, 1),
    ('Lead Engineer', 120000, 2),
    ('Software Engineer', 80000, 2),
    ('Data Analyst', 70000, 2),
    ('Accountant', 60000, 3),
    ('Lawyer', 120000, 4),
    ('Legal Assistant', 60000, 4),
    ('Marketing Manager', 90000, 5),
    ('Marketing Associate', 50000, 5);

INSERT INTO
    employee (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Jack', 'Johnson', 3, NULL),
    ('Oliver', 'Twist', 4, 3),
    ('Michael', 'Hedges', 5, 3),
    ('Philip', 'Aaberg', 6, NULL),
    ('William', 'Ackerman', 7, NULL),
    ('David', 'Cullen', 8, NULL),
    ('Jack', 'Black', 9, NULL),
    ('James', 'Bond', 10, NULL);