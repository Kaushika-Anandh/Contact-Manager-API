const express = require("express");
const connectDb = require("./config/dataBaseConnection");
const { errorHandler } = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json()) //middleware that heps accept json body
app.use("/api/contacts", require("./routes/contactRoutes") );
app.use("/api/users", require("./routes/userRoutes") ); //user router 
app.use(errorHandler); //middleware to handle errors

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});