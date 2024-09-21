const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./routes/AuthRouter");
const TaskRouter = require("./routes/TaskRouter");


require("./models/db");
require("dotenv").config();


app.use(bodyParser.json());
app.use(cors());

app.use("/auth",AuthRouter );
app .use("/api",TaskRouter);



const PORT = process.env.PORT || 5000;

app.get("/ping",(req,res)=>{
    res.send("Pong");
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);

})
