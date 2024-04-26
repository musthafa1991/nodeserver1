// const express = require("express");
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
import cors from 'cors'
import { moviesRouter } from "./routes/movies.js";
import { userRouter } from "./routes/users.js";

dotenv.config()
const port = process.env.port
const app = express();
app.use(cors()) //3rd party middleware
//middleware-> itercept->converting body to json
app.use(express.json());//inbuild middleware 
// const mongoUrl = 'mongodb://localhost:27017';
const mongoUrl = process.env.mongoUrl

async function createConnection() {
    const client = new MongoClient(mongoUrl)
    await client.connect();
    console.log("Mongo is connected");
    return client;
}
export const client = await createConnection()

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use('/movies',moviesRouter);
app.use("/users",userRouter);
app.listen(port, () => { console.log("node running on " + port); })

