const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


// Add a route to serve images from /foodpictures
app.use('/item', express.static(path.join(__dirname, 'public', 'item')));

app.use(express.json());
app.use(cors());
const db = require(`./models`);

//routers
const studentRouter = require("./routes/Students");
app.use("/students", studentRouter);


const employeeRouter = require("./routes/Employees");
app.use("/employees", employeeRouter);


const expenseRouter = require("./routes/Expenses");
app.use("/expenses", expenseRouter);


db.sequelize.sync().then(() => {
  app.listen(2001, () => {
    //api call
    console.log("Server 2001 running");
  });
});