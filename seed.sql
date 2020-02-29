USE tracker;

SET @SalesDept := 'Sales';
SET @DevDept := 'Development';

SET @SeniorSalesman := 'Senior Salesman';
SET @JuniorSalesman := 'Junior Salesman';
SET @SeniorDeveloper := 'Senior Developer';
SET @JuniorDeveloper := 'Junior Developer';

DELETE FROM department WHERE id > 0;
DELETE FROM sys.role WHERE id > 0;
DELETE FROM employee WHERE id > 0;

INSERT INTO department (name) VALUES (@SalesDept);
INSERT INTO department (name) VALUES (@DevDept);

INSERT INTO role (title, salary, department_id) VALUES (@SeniorSalesman, 90000, (SELECT id FROM department WHERE name = @SalesDept));
INSERT INTO role (title, salary, department_id) VALUES (@JuniorSalesman, 50000, (SELECT id FROM department WHERE name = @SalesDept));
INSERT INTO role (title, salary, department_id) VALUES (@SeniorDeveloper, 85000, (SELECT id FROM department WHERE name = @DevDept));
INSERT INTO role (title, salary, department_id) VALUES (@JuniorDeveloper, 45000, (SELECT id FROM department WHERE name = @DevDept));

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Anya', 'Lee', (SELECT id FROM role WHERE title = @SeniorSalesman), null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Juliette', 'Duke', (SELECT id FROM role WHERE title = @JuniorSalesman), (SELECT id FROM (SELECT id FROM employee WHERE first_name = 'Anya' AND last_name = 'Lee') AS A));
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Alena', 'Chan', (SELECT id FROM role WHERE title = @SeniorSalesman), null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Zaniyah', 'Case', (SELECT id FROM role WHERE title = @JuniorSalesman), (SELECT id FROM (SELECT id FROM employee WHERE first_name = 'Alena' AND last_name = 'Chan') AS A));

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Kaitlin', 'Park', (SELECT id FROM role WHERE title = @SeniorDeveloper), null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Clark', 'Mata', (SELECT id FROM role WHERE title = @JuniorDeveloper), (SELECT id FROM (SELECT id FROM employee WHERE first_name = 'Kaitlin' AND last_name = 'Park') AS A));
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Patricia', 'Horn', (SELECT id FROM role WHERE title = @SeniorDeveloper), null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Erika', 'Lloyd', (SELECT id FROM role WHERE title = @JuniorDeveloper), (SELECT id FROM (SELECT id FROM employee WHERE first_name = 'Patricia' AND last_name = 'Horn') AS A));
