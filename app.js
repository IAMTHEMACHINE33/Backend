const express = require("express");
const app = express();
const cors = require("cors");



app.use(express.json());
app.use(cors());
app.use(express.static(__dirname+"/fotoz"));
require("./database/database");
const customerRouter = require("./router/customerR");
app.use(customerRouter);
const productRouter = require("./router/productR");
app.use(productRouter);

app.listen(90)