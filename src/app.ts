import express from "express";
import userAccountRouter from "./routes/userAccountRouter";

const app = express();

app.use('/authenticate', userAccountRouter)
const PORT = 3000;

app.listen(PORT, ()=>{
    console.log('listening on port 3000');
    
});