/* Creating the server. To run in server it can be done in two ways: npm start, and npm run dev (with Nodemon). To run the tests : npm test
 */ 

require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors")


app.use(cors())
app.use(express.json())
app.use(require("./routes/files"))


const PORT = process.env.PORT || 3001


app.listen(PORT, ()=>{

    console.log("Server listening on port " + PORT)
})