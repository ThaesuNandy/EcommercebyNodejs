const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routers = require("./routes");
const cors = require("cors");
const authRouters = require("./routes/auth");
const adminRouters = require("./routes/admin");
const { verifyToken } = require("./middleware");
const { isAdmin } = require("./middleware");



app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(cors());

app.use(authRouters);
app.use("/", verifyToken , routers);
app.use("/", verifyToken, isAdmin , adminRouters);


const dbUri =
  "mongodb+srv://thaesunandy:thaesunandy@cluster0.cvwugzr.mongodb.net/Ecommerce";
mongoose
  .connect(dbUri)
  .then(() => {
    app.listen(8000, () => console.log("Server is running on port 8000"));
  })
  .catch((err) => console.log(err));
