import app from "./index.js";
import dotenv from "dotenv";
dotenv.config();
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Server is up on port: ".concat(port));
});
