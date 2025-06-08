require("dotenv").config();
const cors = require("cors");
const express = require("express");
const server = express();
const cookie=require('cookie-parser')

const { userRouter } = require("./routes/userRoutes");
const connect = require("./db/mongodb");
const { AuthanticationRoute } = require("./routes/AuthRouter");
// const { userAuthanticationCheck } = require("./middleware/userAuth");
connect();

server.use(express.json());
server.use(
  cors({
    origin: 'http://localhost:5173', 
    credentials: true,
  })
);
server.use(cookie())
server.use("/api", userRouter);
server.use("/api/auth",AuthanticationRoute);

const port = process.env.PORT || 5000;
server.get('/',(req,res)=>{
res.json({sucess:true,msg:'home api is working...'})
})
server.listen(port, () => {
  console.log(`server is listen on port no.... ${port}`);
});
