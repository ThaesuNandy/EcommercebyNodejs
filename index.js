const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routers = require("./routes");
const authRouters = require("./routes/auth");
const { verifyToken } = require("./middleware");

app.use(express.urlencoded({ extended : true }));

app.use("/", verifyToken,routers);
app.use(authRouters);

const dbUri =
  "mongodb+srv://thaesunandy:thaesunandy@cluster0.cvwugzr.mongodb.net/Ecommerce";
mongoose
  .connect(dbUri)
  .then(() => {
    app.listen(8000, () => console.log("Server is running on port 8000"));
  })
  .catch((err) => console.log(err));
