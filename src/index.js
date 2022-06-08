require('dotenv').config()
const express = require("express");
var bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT;
const db = require("./config/db")
const auth = require("./routes/auth/auth");
const users = require("./routes/users/users");
const todos = require("./routes/todos/todos");
const middleware = require("./middlewares/middlewares")
app.use(bodyParser.json())
app.use("/", auth);
app.use(middleware.auth);
app.use("/user", users.router_user);
app.use("/users", users.router_users);
app.use("/todos", todos);

app.listen(port, function() {
    console.log(`App listening at http://localhost:${port}`);
});