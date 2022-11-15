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
      const sql = `SELECT People.Name, People.Phone, Departments.Name AS Department, People.Street, People.City, People.State, People.ZIP, People.Country 
            FROM People 
            INNER JOIN Departments ON People.DepartmentID = Departments.DepartmentID;`;
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

    this.closeDB = () => {
      DB.close();
    };
  }
}
module.exports = { API };
