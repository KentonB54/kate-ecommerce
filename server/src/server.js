require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT
const app = express();
const { getAllUsers } = require('./models')
app.use(express.json());

app.use(cors())

const { client } = require("./config/database");

client.connect();

app.get("/", async (req, res) => {

    const users = await getAllUsers()

    res.status(200).json({
        message: "welcome to your express server sir",
        kate: "is cool",
        users: users
    })
})

app.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});