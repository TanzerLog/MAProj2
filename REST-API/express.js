var express = require("express");
const cors = require("cors");
const API_Export = require("./API.js");

const API = new API_Export.API();

const app = express();
app.use(cors());
app.use(express.json());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

//Body START

app.get("/get_all_people", (req, res) => {
  res.send(API.retrievePeople());
});

app.get("/get_all_departments", (req, res) => {
  res.send(API.retrieveDepartments());
});

app.get("/", (req, res) => {
  res.send(req.query);
});

app.post("/", (req, res) => {
  res.send(req.body);
});

app.post("/modify_person", (req, res) => {
  console.log(req.body);
  API.modifyPerson(
    parseInt(req.body["PeopleID"], 10),
    req.body["Name"],
    req.body["Phone"],
    parseInt(req.body["DepartmentID"], 10),
    req.body["Street"],
    req.body["City"],
    req.body["State"],
    req.body["ZIP"],
    req.body["Country"]
  );
  res.send("Success");
});

app.post("/add_person", (req, res) => {
  console.log(req.body);
  API.addPeople(
    req.body["Name"],
    req.body["Phone"],
    parseInt(req.body["DepartmentID"], 10),
    req.body["Street"],
    req.body["City"],
    req.body["State"],
    req.body["ZIP"],
    req.body["Country"]
  );
  res.send("Success");
});

app.post("/delete_person", (req, res) => {
  API.deletePerson(parseInt(req.body["PeopleID"], 10));
  res.send("Success");
});

//Body END

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
