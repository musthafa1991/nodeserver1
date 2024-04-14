// const express = require("express");
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config()
const port = 4000
// console.log(process.env);

const app = express();
//middleware-> itercept->converting body to json
app.use(express.json());



// const mongoUrl = 'mongodb://localhost:27017';

const mongoUrl=process.env.mongoUrl

async function createConnection() {
    const client = new MongoClient(mongoUrl)
    await client.connect();
    console.log("Mongo is connected");
    return client;
}
const client = await createConnection()

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.get("/movies",async (req, res) => {
    try {
        let result = await client.db("trailDb").collection("movies").find({}).toArray();
       
            res.send(result)
        
    } catch (error) {
        console.error("Error occurred while fetching movie:", error);
    }
})


app.get("/movies/:id", async (req, res) => {
    let { id } = req.params
    try {
        let movie = await client.db("trailDb").collection("movies").findOne({id: id})
        if (!movie) {
            res.status(404).send("No movie found with the given id.")

        } else {
            res.send(movie)
        }
    } catch (error) {
        console.error("Error occurred while fetching movie:", error);
    }
})

app.post('/movies',async function(req,res){
    let data=req.body;
    const result=await client.db("trailDb").collection("movies").insertMany(data)
    res.send(result)
})


app.delete("/movies",async (req, res) => {
   
        let result = await client.db("trailDb").collection("movies").deleteMany({})
        if (result) {
            res.send(result)  
        }else{
            res.send(result,{data:"deleted"})
        }
        
    
})

app.delete("/movies/:id",async (req, res) => {
    let { id } = req.params
    let result = await client.db("trailDb").collection("movies").deleteOne({id:id})
    if (result) {
        res.send(result)  
    }else{
        res.send(result,{data:"deleted"})
    }
    

})


app.put("/movies/:id", async (req, res) => {
    let { id } = req.params
    let data=req.body
    try {
        let result = await client.db("trailDb").collection("movies").updateOne({id: id},{$set:data})
        if (!result) {
            res.status(404).send("No movie found with the given id.")

        } else {
            res.send(result)
        }
    } catch (error) {
        console.error("Error occurred while fetching movie:", error);
    }
})

app.listen(port, () => { console.log("node running on " + port); })
