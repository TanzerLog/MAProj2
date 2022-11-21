class API {
  constructor() {
    this.DB = require("better-sqlite3")("../Database/Database.db", {});

    this.runRetrieveSQL = (sql) => {
      const SQL_STATEMENT = this.DB.prepare(sql);
      return SQL_STATEMENT.all();
    };

    this.runChangeSQL = (sql) => {
      const SQL_STATEMENT = this.DB.prepare(sql);
      SQL_STATEMENT.run();
    };

    this.retrievePeople = () => {
      const sql = `SELECT People.PeopleID, People.Name, People.Phone, People.DepartmentID, Departments.Name AS Department, People.Street, People.City, People.State, People.ZIP, People.Country 
            FROM People 
            INNER JOIN Departments ON People.DepartmentID = Departments.DepartmentID;`;
      return this.runRetrieveSQL(sql);
    };

    this.retrieveDepartments = () => {
      const sql =
        "SELECT Departments.DepartmentID, Departments.Name FROM Departments;";
      return this.runRetrieveSQL(sql);
    };

    this.addPeople = (
      name,
      phone,
      departmentID,
      street,
      city,
      state,
      zip,
      country
    ) => {
      const sql = `INSERT INTO People (Name, Phone, DepartmentID, Street, City, State, ZIP, Country) 
        VALUES ('${name}', '${phone}', ${departmentID}, '${street}', '${city}', '${state}', '${zip}', '${country}');`;
      this.runChangeSQL(sql);
    };

    this.modifyPerson = (
      peopleID,
      name,
      phone,
      departmentID,
      street,
      city,
      state,
      zip,
      country
    ) => {
      const sql = `UPDATE People 
        SET Name = '${name}', Phone = '${phone}', DepartmentID = ${departmentID}, Street = '${street}', City = '${city}', State = '${state}', ZIP = '${zip}', Country = '${country}' 
        WHERE PeopleID = ${peopleID};`;
      this.runChangeSQL(sql);
    };

    this.deletePerson = (peopleID) => {
      const sql = `DELETE FROM People WHERE PeopleID = ${peopleID};`;
      this.runChangeSQL(sql);
    };

    this.closeDB = () => {
      DB.close();
    };
  }
}
module.exports = { API };

// --INSERT
// INSERT INTO table_name (column1, column2, column3, ...)
// VALUES (value1, value2, value3, ...);

// --UPDATE
// UPDATE table_name
//  SET column1 = value1, column2 = value2, ...
//  WHERE condition;

// --DELETE
// DELETE FROM tablename WHERE condition;
// e.g. DELETE FROM Customers WHERE peopleID=1;

// --SELECT
// SELECT column1, column2 FROM table;
