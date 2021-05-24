const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employeeTracker_DB',
});


const start = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'You are working within the employee database. What would you like to do?',
            choices: ['View All Employees', 'View Roles', 'View Departments', 'Update Employee', 'Add Department', 'Add Role', 'Add Employee', 'Exit'],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View All Employees':
                    allEmployeeSearch();
                    break;
                case 'View Roles':
                    employeesByRole();
                    break;
                case 'View Departments':
                    employeesByDepartment();
                    break;
                case 'Update Employee':
                    updateEmployee();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Exit':
                    exitApp();
                    break;

            }
        })

}

function allEmployeeSearch() {
    var query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table("All Employees:", res);
        start();

    })
}

function employeesByRole() {
    var query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table("All Roles:", res);
        start();
    })
}


function employeesByDepartment() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table("All Departments:", res);
        start();
    })
}

function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'newDept',
                type: 'input',
                message: "Enter new department name:"
            }
        ]).then(function (answer) {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    name: answer.newDept
                });
            var query = "SELECT * FROM department";
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.log("Your department has been added!")
                console.table("All Departments:", res);
                start();
            })
        }


        )
}

function addRole() {
    inquirer
        .prompt({
            name: "role_title",
            type: "input",
            message: ["Enter name of new role:"]
        })
        .then(function (answer) {
            var role_title = answer.role_title;

            inquirer
                .prompt({
                    name: "salary",
                    type: "input",
                    message: ["Enter role salary in number form:"]
                })
                .then(function (answer) {
                    var salary = answer.salary;

                    inquirer
                        .prompt({
                            name: "dept_id",
                            type: "input",
                            message: ["Enter new role department ID:"]
                        }).then(function (answer) {
                            let dept_id = answer.dept_id;

                            console.log(`Your new role has been added!`);

                            var query = "INSERT INTO role (role_title, salary, dept_id) VALUES ?";
                            connection.query(query, [[[role_title, salary, dept_id]]], function (err, res) {
                                if (err) throw err;

                                start()

                            });
                        })
                })

        })
}


function addEmployee() {
    inquirer
        .prompt({
            name: "first_name",
            type: "input",
            message: ["Enter new employee's first name:"]
        })

        .then(function (answer) {
            var first_name = answer.first_name;

            inquirer
            .prompt({
                name: "last_name",
                type: "input",
                message: ["Enter new employee's last name:"]
            })
    
            .then(function (answer) {
                var last_name = answer.last_name;
            
            inquirer
                .prompt({
                    name: "role_id",
                    type: "input",
                    message: ["Enter employee's role ID:"]
                }).then(function (answer) {
                    var role_id = answer.role_id;

                    inquirer
                        .prompt({
                            name: "manager_id",
                            type: "input",
                            message: ["Enter employee's manager's ID:"]
                        }).then(function (answer) {
                            var manager_id = answer.manager_id;

                            console.log(`Your new employee has been added!`);
                            var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ?";

                            
                            connection.query (query, [[[first_name, last_name, role_id, manager_id]]], function (err, res) {
                                if (err) throw err
                            })
                            start();
                        })
                    })
                })

            })
            
                }

    function updateEmployee() {
        inquirer
        .prompt({  
            name: "id",
            type: "input",
            message: "Enter the ID of the employee you would like to update:"
        }).then(function(answer) {
            var id = answer.id;
        

        inquirer
        .prompt({ 
            name: "role_id",
            type: "input",
            message: "Enter the employee's new role ID:"
        }).then(function(answer) {
            var role_id = answer.role_id;
        
            console.log("The employee's role has been updated!")
            
            var query = "UPDATE employee SET role_id=? WHERE id=?";
            connection.query(query, [role_id, id], function (err, res) {
                if (err) throw err;
            })
               
                start();
            
        })
        })
    }


    function exitApp() {
                        connection.end();
                    }


    connection.connect((err) => {
                        if (err) throw err;
                        start();
                    })