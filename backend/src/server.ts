import app from "./app";
import config from "./config";
import dotenv from "dotenv";

dotenv.config();
const PORT = config.port;

app.listen(PORT,()=>{
    console.log(`Server is listening on http://localhost:${PORT}/api/v1`);
})