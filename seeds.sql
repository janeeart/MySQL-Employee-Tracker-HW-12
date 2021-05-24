INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Legal");

INSERT INTO role (role_title, salary, dept_id)
VALUE ("Lead Engineer", 200000, 1);
INSERT INTO role (role_title, salary, dept_id)
VALUE ("Accountant", 110000, 2);
INSERT INTO role (role_title, salary, dept_id)
VALUE ("Sales Rep", 85000, 3);
INSERT INTO role (role_title, salary, dept_id)
VALUE ("Legal Team Lead", 210000, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Janée", "Artis", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Michael", "Bates", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Mary", "Lee", null, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Ruth", "Abraha", null, 4);
