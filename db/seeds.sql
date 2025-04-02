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
    ('Jim', 'Brown', 3, NULL),
    ('Jake', 'White', 4, 3),
    ('Jill', 'Green', 5, 3),
    ('Jack', 'Black', 6, NULL),
    ('Jenny', 'Blue', 7, NULL),
    ('Joe', 'Red', 8, NULL),
    ('Jessica', 'Purple', 9, NULL),
    ('Jordan', 'Orange', 10, NULL);