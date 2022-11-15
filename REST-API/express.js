var express = require("express");
const API_Export = require("./API.js");

const API = new API_Export.API();

const app = express();
app.use(express.json());

//Body START

app.get("/get_all_people", (req, res) => {
  res.send(API.retrievePeople());
});

app.get("/", (req, res) => {
  res.send(req.query);
});

app.post("/", (req, res) => {
  res.send(req.body);
});

app.post("/delete_department", (req, res) => {
  API.deleteDepartment(parseInt(req.body["DepartmentID"], 10));
  res.send("Success");
});

//Body END

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
