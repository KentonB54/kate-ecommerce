require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT
const app = express();

app.use(express.json());

app.use(cors())

app.get("/", async (req, res) => {
    res.status(200).json({
        message: "welcome to your express server sir"
    })
})
const { client } = require("./config/database");

client.connect();

app.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});