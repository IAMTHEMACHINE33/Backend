const express = require("express");
const app = express();
app.use(express.json());

require("./database/database");
const customerRouter = require("./router/customerR");
app.use(customerRouter);

app.listen(90)